import { FC, memo, useCallback, useContext, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { cloneDeep, get } from "lodash"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import { TransformWidgetProps } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/interface"
import {
  GLOBAL_DATA_CONTEXT,
  BUILDER_CALC_CONTEXT,
} from "@/page/App/context/globalDataProvider"
import { EventsInProps } from "@/widgetLibrary/interface"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { runEventHandler } from "@/utils/eventHandlerHelper"
import { applyWrapperStylesStyle } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { RootState } from "@/store"
import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import {
  applyEffectMapToComponentNodes,
  getReflowResult,
  getNearComponentNodes,
} from "@/page/App/components/DotPanel/calc"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { isObject } from "@/utils/typeHelper"

export const getEventScripts = (events: EventsInProps[], eventType: string) => {
  return events.filter((event) => {
    return event.eventType === eventType
  })
}

export const TransformWidgetWrapper: FC<TransformWidgetProps> = memo(
  (props: TransformWidgetProps) => {
    const { componentNode } = props

    const { displayName, type, w, h, unitW, unitH, childrenNode } =
      componentNode

    const displayNameMapProps = useSelector(getExecutionResult)
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

    const updateComponentHeight = useCallback(
      (newHeight: number) => {
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

    const realProps = useMemo(
      () => displayNameMapProps[displayName] ?? {},
      [displayName, displayNameMapProps],
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

    const getOnChangeEventScripts = useCallback(() => {
      const events = get(realProps, "events")
      if (events) {
        return getEventScripts(events, "change")
      }
      return []
    }, [realProps])

    const getOnClickEventScripts = useCallback(() => {
      const events = get(realProps, "events")
      if (events) {
        return getEventScripts(events, "click")
      }
      return []
    }, [realProps])

    const getOnSortingChangeEventScripts = useCallback(() => {
      const events = get(realProps, "events")
      if (events) {
        return getEventScripts(events, "sortingChange")
      }
      return []
    }, [realProps])

    const getOnPaginationChangeEventScripts = useCallback(() => {
      const events = get(realProps, "events")
      if (events) {
        return getEventScripts(events, "paginationChange")
      }
      return []
    }, [realProps])

    const getOnColumnFiltersChangeEventScripts = useCallback(() => {
      const events = get(realProps, "events")
      if (events) {
        return getEventScripts(events, "columnFiltersChange")
      }
      return []
    }, [realProps])

    const handleOnChange = useCallback(() => {
      getOnChangeEventScripts().forEach((scriptObj) => {
        runEventHandler(scriptObj, BUILDER_CALC_CONTEXT)
      })
    }, [getOnChangeEventScripts])

    const handleOnClick = useCallback(() => {
      getOnClickEventScripts().forEach((scriptObj) => {
        runEventHandler(scriptObj, BUILDER_CALC_CONTEXT)
      })
    }, [getOnClickEventScripts])

    const handleOnSortingChange = useCallback(() => {
      getOnSortingChangeEventScripts().forEach((scriptObj) => {
        runEventHandler(scriptObj, BUILDER_CALC_CONTEXT)
      })
    }, [getOnSortingChangeEventScripts])

    const handleOnPaginationChange = useCallback(() => {
      getOnPaginationChangeEventScripts().forEach((scriptObj) => {
        runEventHandler(scriptObj, BUILDER_CALC_CONTEXT)
      })
    }, [getOnPaginationChangeEventScripts])

    const handleOnColumnFiltersChange = useCallback(() => {
      getOnColumnFiltersChangeEventScripts().forEach((scriptObj) => {
        runEventHandler(scriptObj, BUILDER_CALC_CONTEXT)
      })
    }, [getOnColumnFiltersChangeEventScripts])

    const getOnFormSubmitEventScripts = useCallback(() => {
      const events = get(realProps, "events")
      if (events) {
        return getEventScripts(events, "submit")
      }
      return []
    }, [realProps])

    const handleOnFormSubmit = useCallback(() => {
      getOnFormSubmitEventScripts().forEach((scriptObj) => {
        runEventHandler(scriptObj, BUILDER_CALC_CONTEXT)
      })
    }, [getOnFormSubmitEventScripts])

    const getOnFormInvalidEventScripts = useCallback(() => {
      const events = get(realProps, "events")
      if (events) {
        return getEventScripts(events, "invalid")
      }
      return []
    }, [realProps])

    const handleOnFormInvalid = useCallback(() => {
      getOnFormInvalidEventScripts().forEach((scriptObj) => {
        runEventHandler(scriptObj, BUILDER_CALC_CONTEXT)
      })
    }, [getOnFormInvalidEventScripts])

    if (!type) return null
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

    return hidden ? null : (
      <div
        css={applyWrapperStylesStyle(
          borderColor,
          borderWidth,
          radius,
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
          handleUpdateGlobalData={handleUpdateGlobalData}
          handleDeleteGlobalData={handleDeleteGlobalData}
          handleUpdateOriginalDSLMultiAttr={handleUpdateOriginalDSLMultiAttr}
          handleOnChange={handleOnChange}
          handleOnClick={handleOnClick}
          handleOnSortingChange={handleOnSortingChange}
          handleOnPaginationChange={handleOnPaginationChange}
          handleOnColumnFiltersChange={handleOnColumnFiltersChange}
          handleUpdateDsl={handleUpdateDsl}
          updateComponentHeight={updateComponentHeight}
          handleUpdateMultiExecutionResult={handleUpdateMultiExecutionResult}
          handleOnFormSubmit={handleOnFormSubmit}
          handleOnFormInvalid={handleOnFormInvalid}
          displayName={displayName}
          childrenNode={childrenNode}
          componentNode={componentNode}
        />
      </div>
    )
  },
)

TransformWidgetWrapper.displayName = "TransformWidgetWrapper"
