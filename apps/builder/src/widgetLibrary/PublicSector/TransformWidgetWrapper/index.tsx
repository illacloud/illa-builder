import { cloneDeep, get, isFunction, isNumber, merge, set } from "lodash"
import { FC, memo, useCallback, useContext, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/renderComponentCanvas"
import {
  BUILDER_CALC_CONTEXT,
  GLOBAL_DATA_CONTEXT,
} from "@/page/App/context/globalDataProvider"
import { getContainerListDisplayNameMappedChildrenNodeDisplayName } from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import store, { RootState } from "@/store"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { runEventHandler } from "@/utils/eventHandlerHelper"
import { isObject } from "@/utils/typeHelper"
import { MIN_HEIGHT } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/config"
import { TransformWidgetProps } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/interface"
import { applyWrapperStylesStyle } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"

export const TransformWidgetWrapper: FC<TransformWidgetProps> = memo(
  (props: TransformWidgetProps) => {
    const { componentNode, blockColumns } = props
    const displayNameMapProps = useSelector(getExecutionResult)
    const { displayName, type, w, h, unitW, unitH, childrenNode, parentNode } =
      componentNode

    const realProps = useMemo(
      () => displayNameMapProps[displayName] ?? {},
      [displayName, displayNameMapProps],
    )
    const { handleUpdateGlobalData, handleDeleteGlobalData } =
      useContext(GLOBAL_DATA_CONTEXT)
    const dispatch = useDispatch()

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
        const rootState = store.getState() as RootState
        const executionResult = getExecutionResult(rootState)
        const oldH = executionResult[displayName]?.$layoutInfo.h ?? 0
        // padding 2px so this is +4
        const newH = Math.max(
          Math.ceil((newHeight + 6) / UNIT_HEIGHT),
          MIN_HEIGHT,
        )
        if (newH === oldH) return
        dispatch(
          executionActions.updateWidgetLayoutInfoReducer({
            displayName,
            layoutInfo: {
              h: newH,
            },
            options: {
              parentNode: parentNode as string,
              effectRows: newH - oldH,
            },
          }),
        )
      },
      [dispatch, displayName, parentNode],
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

    const getRunEvents = useCallback(
      (
        eventType: string,
        path: string,
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
        return {
          dynamicPaths,
          needRunEvents,
          finalContext,
        }
      },
      [componentNode.props],
    )

    const triggerEventHandler = useCallback(
      (
        eventType: string,
        path: string = "events",
        otherCalcContext?: Record<string, any>,
        formatPath?: (path: string) => string,
      ) => {
        const { dynamicPaths, needRunEvents, finalContext } = getRunEvents(
          eventType,
          path,
          otherCalcContext,
        )
        dynamicPaths?.forEach((path: string) => {
          const realPath = isFunction(formatPath)
            ? formatPath(path)
            : path.split(".").slice(1).join(".")
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
      [getRunEvents],
    )

    const triggerMappedEventHandler = useCallback(
      (eventType: string, path: string = "events", index?: number) => {
        const { dynamicPaths, needRunEvents, finalContext } = getRunEvents(
          eventType,
          path,
        )
        dynamicPaths?.forEach((path: string) => {
          const realPath = path.split(".").slice(2).join(".")
          try {
            const dynamicString = get(needRunEvents, realPath, "")
            if (dynamicString) {
              const calcValue = evaluateDynamicString(
                "",
                dynamicString,
                finalContext,
              )
              if (Array.isArray(calcValue) && isNumber(index)) {
                set(needRunEvents, realPath, calcValue[index])
              } else {
                set(needRunEvents, realPath, calcValue)
              }
            }
          } catch (e) {
            console.log(e)
          }
        })
        needRunEvents.forEach((scriptObj: any) => {
          runEventHandler(scriptObj, finalContext)
        })
      },
      [getRunEvents],
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
          triggerMappedEventHandler={triggerMappedEventHandler}
        />
      </div>
    )
  },
)

TransformWidgetWrapper.displayName = "TransformWidgetWrapper"
