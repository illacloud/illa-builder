import { cloneDeep, get, merge, set } from "lodash"
import { FC, memo, useCallback, useContext, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  applyEffectMapToComponentNodes,
  getNearComponentNodes,
  getReflowResult,
} from "@/page/App/components/DotPanel/calc"
import {
  BUILDER_CALC_CONTEXT,
  GLOBAL_DATA_CONTEXT,
} from "@/page/App/context/globalDataProvider"
import {
  getCanvas,
  getContainerListDisplayNameMappedChildrenNodeDisplayName,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import store, { RootState } from "@/store"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { runEventHandler } from "@/utils/eventHandlerHelper"
import { isObject } from "@/utils/typeHelper"
import { TransformWidgetProps } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/interface"
import { applyWrapperStylesStyle } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"

export const TransformWidgetWrapper: FC<TransformWidgetProps> = memo(
  (props: TransformWidgetProps) => {
    const { componentNode, blockColumns } = props
    const displayNameMapProps = useSelector(getExecutionResult)
    const { displayName, type, w, h, unitW, unitH, childrenNode } =
      componentNode

    const realProps = useMemo(
      () => displayNameMapProps[displayName] ?? {},
      [displayName, displayNameMapProps],
    )
    const { handleUpdateGlobalData, handleDeleteGlobalData } =
      useContext(GLOBAL_DATA_CONTEXT)
    const dispatch = useDispatch()

    const allComponents = useSelector<RootState, ComponentNode[]>(
      (rootState) => {
        const rootNode = getCanvas(rootState)
        const parentNodeDisplayName = componentNode.parentNode
        const target = searchDsl(rootNode, parentNodeDisplayName)
        if (target) {
          return target.childrenNode || []
        }
        return []
      },
    )

    const containerListMapChildName = useSelector(
      getContainerListDisplayNameMappedChildrenNodeDisplayName,
    )

    const listContainerDisabled = useMemo(() => {
      const listWidgetDisplayNames = Object.keys(containerListMapChildName)
      let currentListDisplayName = ""
      for (let i = 0; i < listWidgetDisplayNames.length; i++) {
        if (
          containerListMapChildName[listWidgetDisplayNames[i]].includes(
            displayName,
          )
        ) {
          currentListDisplayName = listWidgetDisplayNames[i]
          break
        }
      }
      if (!currentListDisplayName) return realProps?.disabled || false
      const listWidgetProps = displayNameMapProps[currentListDisplayName]
      if (Object.hasOwn(listWidgetProps, "disabled"))
        return listWidgetProps.disabled
      return realProps?.disabled || false
    }, [
      containerListMapChildName,
      displayName,
      displayNameMapProps,
      realProps?.disabled,
    ])

    const updateComponentHeight = useCallback(
      (newHeight: number) => {
        // padding 2px so this is +4
        const newH = Math.ceil((newHeight + 6) / componentNode.unitH)
        if (newH === componentNode.h) return
        const newItem = {
          ...componentNode,
          h: Math.max(newH, componentNode.minH),
        }
        const cloneDeepAllComponents = cloneDeep(allComponents)
        const findIndex = cloneDeepAllComponents.findIndex(
          (node) => node.displayName === newItem.displayName,
        )
        cloneDeepAllComponents.splice(findIndex, 1, newItem)
        if (componentNode.h < newItem.h) {
          const result = getReflowResult(newItem, cloneDeepAllComponents, false)
          dispatch(
            componentsActions.updateComponentReflowReducer([
              {
                parentDisplayName: componentNode.parentNode || "root",
                childNodes: result.finalState,
              },
            ]),
          )
        }
        if (componentNode.h > newItem.h) {
          const effectRows = componentNode.h - newItem.h
          const effectMap = getNearComponentNodes(
            componentNode,
            cloneDeepAllComponents,
          )
          effectMap.set(newItem.displayName, newItem)
          effectMap.forEach((node) => {
            if (node.displayName !== componentNode.displayName) {
              node.y -= effectRows
            }
          })
          let finalState = applyEffectMapToComponentNodes(
            effectMap,
            allComponents,
          )
          dispatch(
            componentsActions.updateComponentReflowReducer([
              {
                parentDisplayName: componentNode.parentNode || "root",
                childNodes: finalState,
              },
            ]),
          )
        }
      },
      [allComponents, componentNode, dispatch],
    )

    const handleUpdateDsl = useCallback(
      (value: Record<string, any>) => {
        dispatch(
          executionActions.updateExecutionByDisplayNameReducer({
            displayName,
            value,
          }),
        )
      },
      [dispatch, displayName],
    )

    const handleUpdateMultiExecutionResult = useCallback(
      (allUpdate: { displayName: string; value: Record<string, any> }[]) => {
        dispatch(
          executionActions.updateExecutionByMultiDisplayNameReducer(allUpdate),
        )
      },
      [dispatch],
    )

    const handleUpdateOriginalDSLMultiAttr = useCallback(
      (updateSlice: Record<string, any>) => {
        if (!isObject(updateSlice)) return
        dispatch(
          componentsActions.updateComponentPropsReducer({
            displayName: displayName,
            updateSlice,
          }),
        )
      },
      [dispatch, displayName],
    )

    const handleUpdateOriginalDSLOtherMultiAttr = useCallback(
      (displayName: string, updateSlice: Record<string, any>) => {
        if (!displayName || !isObject(updateSlice)) return
        dispatch(
          componentsActions.updateComponentPropsReducer({
            displayName,
            updateSlice,
          }),
        )
      },
      [dispatch],
    )

    const triggerEventHandler = useCallback(
      (
        eventType: string,
        path: string = "events",
        otherCalcContext?: Record<string, any>,
      ) => {
        const originEvents = get(componentNode.props, path, []) as any[]
        const dynamicPaths = get(componentNode.props, "$dynamicAttrPaths", [])
        const needRunEvents = cloneDeep(originEvents).filter((originEvent) => {
          return originEvent.eventType === eventType
        })
        const rootState = store.getState()
        const calcContext = getExecutionResult(rootState)
        const finalContext = merge(
          cloneDeep(BUILDER_CALC_CONTEXT),
          calcContext,
          otherCalcContext,
        )
        dynamicPaths?.forEach((path: string) => {
          const realPath = path.split(".").slice(1).join(".")
          try {
            const dynamicString = get(needRunEvents, realPath, "")
            if (dynamicString) {
              const calcValue = evaluateDynamicString(
                "",
                dynamicString,
                finalContext,
              )
              set(needRunEvents, realPath, calcValue)
            }
          } catch (e) {
            console.log(e)
          }
        })
        needRunEvents.forEach((scriptObj: any) => {
          runEventHandler(scriptObj, finalContext)
        })
      },
      [componentNode.props],
    )

    const widget = widgetBuilder(type)
    if (!widget) return null

    const Component = widget.widget
    const {
      hidden,
      borderColor,
      backgroundColor,
      radius,
      borderWidth,
      shadow,
    } = realProps

    const _radius = !isNaN(Number(radius)) ? radius + "px" : radius?.toString()
    const _borderWidth = !isNaN(Number(borderWidth))
      ? borderWidth + "px"
      : borderWidth?.toString()

    return hidden ? null : (
      <div
        css={applyWrapperStylesStyle(
          borderColor,
          _borderWidth,
          _radius,
          backgroundColor,
          shadow,
          type,
        )}
      >
        <Component
          {...realProps}
          w={w}
          h={h}
          unitW={unitW}
          unitH={unitH}
          blockColumns={blockColumns}
          handleUpdateGlobalData={handleUpdateGlobalData}
          handleDeleteGlobalData={handleDeleteGlobalData}
          handleUpdateOriginalDSLMultiAttr={handleUpdateOriginalDSLMultiAttr}
          handleUpdateOriginalDSLOtherMultiAttr={
            handleUpdateOriginalDSLOtherMultiAttr
          }
          handleUpdateDsl={handleUpdateDsl}
          updateComponentHeight={updateComponentHeight}
          handleUpdateMultiExecutionResult={handleUpdateMultiExecutionResult}
          displayName={displayName}
          childrenNode={childrenNode}
          componentNode={componentNode}
          disabled={listContainerDisabled}
          triggerEventHandler={triggerEventHandler}
        />
      </div>
    )
  },
)

TransformWidgetWrapper.displayName = "TransformWidgetWrapper"
