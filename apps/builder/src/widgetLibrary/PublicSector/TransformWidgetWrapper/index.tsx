import { FC, memo, useCallback, useContext, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { cloneDeep, get } from "lodash"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import { TransformWidgetProps } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/interface"
import { GLOBAL_DATA_CONTEXT } from "@/page/App/context/globalDataProvider"
import { EventsInProps } from "@/widgetLibrary/interface"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { runEventHandler } from "@/utils/eventHandlerHelper"
import { applyHiddenWrapperStyle } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { RootState } from "@/store"
import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import {
  applyEffectMapToComponentNodes,
  getReflowResult,
  getNearCompntNodes,
} from "@/page/App/components/DotPanel/calc"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"

export const getEventScripts = (events: EventsInProps[], eventType: string) => {
  return events.filter((event) => {
    return event.eventType === eventType
  })
}

export const TransformWidgetWrapper: FC<TransformWidgetProps> = memo(
  (props: TransformWidgetProps) => {
    const { componentNode } = props

    const { displayName, type, w, h, unitW, unitH } = componentNode

    const displayNameMapProps = useSelector(getExecutionResult)
    const {
      handleUpdateGlobalData,
      handleDeleteGlobalData,
      globalData,
    } = useContext(GLOBAL_DATA_CONTEXT)
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
            componentsActions.updateComponentReflowReducer({
              parentDisplayName: componentNode.parentNode || "root",
              childNodes: result.finalState,
            }),
          )
        }
        if (componentNode.h > newItem.h) {
          const effectRows = componentNode.h - newItem.h
          const effectMap = getNearCompntNodes(
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
            componentsActions.updateComponentReflowReducer({
              parentDisplayName: componentNode.parentNode || "root",
              childNodes: finalState,
            }),
          )
        }
      },
      [allComponents, componentNode, dispatch],
    )

    const realProps = useMemo(() => displayNameMapProps[displayName] ?? {}, [
      displayName,
      displayNameMapProps,
    ])

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
        runEventHandler(scriptObj, globalData)
      })
    }, [getOnChangeEventScripts, globalData])

    const handleOnClick = useCallback(() => {
      getOnClickEventScripts().forEach((scriptObj) => {
        runEventHandler(scriptObj, globalData)
      })
    }, [getOnClickEventScripts, globalData])

    const handleOnSortingChange = useCallback(() => {
      getOnSortingChangeEventScripts().forEach((scriptObj) => {
        runEventHandler(scriptObj, globalData)
      })
    }, [getOnSortingChangeEventScripts, globalData])

    const handleOnPaginationChange = useCallback(() => {
      getOnPaginationChangeEventScripts().forEach((scriptObj) => {
        runEventHandler(scriptObj, globalData)
      })
    }, [getOnPaginationChangeEventScripts, globalData])

    const handleOnColumnFiltersChange = useCallback(() => {
      getOnColumnFiltersChangeEventScripts().forEach((scriptObj) => {
        runEventHandler(scriptObj, globalData)
      })
    }, [getOnColumnFiltersChangeEventScripts, globalData])

    if (!type) return null
    const COMP = widgetBuilder(type).widget
    if (!COMP) return null

    const { hidden } = realProps

    return (
      <div css={applyHiddenWrapperStyle(hidden)}>
        <COMP
          {...realProps}
          w={w}
          h={h}
          unitW={unitW}
          unitH={unitH}
          handleUpdateGlobalData={handleUpdateGlobalData}
          handleDeleteGlobalData={handleDeleteGlobalData}
          handleOnChange={handleOnChange}
          handleOnClick={handleOnClick}
          handleOnSortingChange={handleOnSortingChange}
          handleOnPaginationChange={handleOnPaginationChange}
          handleOnColumnFiltersChange={handleOnColumnFiltersChange}
          handleUpdateDsl={handleUpdateDsl}
          updateComponentHeight={updateComponentHeight}
          displayName={displayName}
        />
      </div>
    )
  },
)

TransformWidgetWrapper.displayName = "TransformWidgetWrapper"
