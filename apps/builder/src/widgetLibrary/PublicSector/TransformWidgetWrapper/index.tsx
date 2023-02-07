import { cloneDeep, get, set } from "lodash"
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
import { RootState } from "@/store"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { runEventHandler } from "@/utils/eventHandlerHelper"
import { isObject } from "@/utils/typeHelper"
import { TransformWidgetProps } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/interface"
import { applyWrapperStylesStyle } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { EventsInProps } from "@/widgetLibrary/interface"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"

export const getEventScripts = (events: EventsInProps[], eventType: string) => {
  return events.filter((event) => {
    return event.eventType === eventType
  })
}

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
        const newH = Math.ceil((newHeight + 4) / componentNode.unitH)
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

    const getOnFocusEventScripts = useCallback(() => {
      const events = get(realProps, "events")
      if (events) {
        return getEventScripts(events, "focus")
      }
      return []
    }, [realProps])

    const getOnOpenModalEventScripts = useCallback(() => {
      const events = get(realProps, "events")
      if (events) {
        return getEventScripts(events, "onOpenModal")
      }
      return []
    }, [realProps])

    const handleOnOpenModal = useCallback(() => {
      getOnOpenModalEventScripts().forEach((scriptObj) => {
        runEventHandler(scriptObj, BUILDER_CALC_CONTEXT)
      })
    }, [getOnOpenModalEventScripts])

    const getOnCloseModalEventScripts = useCallback(() => {
      const events = get(realProps, "events")
      if (events) {
        return getEventScripts(events, "onCloseModal")
      }
      return []
    }, [realProps])

    const handleOnCloseModal = useCallback(
      (path: string) => {
        getOnCloseModalEventScripts().forEach((scriptObj) => {
          runEventHandler(scriptObj, BUILDER_CALC_CONTEXT)
        })
      },
      [getOnCloseModalEventScripts],
    )

    const getOnBlurEventScripts = useCallback(() => {
      const events = get(realProps, "events")
      if (events) {
        return getEventScripts(events, "blur")
      }
      return []
    }, [realProps])

    const getOnClickMenuItemEventScripts = useCallback(
      (path: string) => {
        const events = get(realProps, path)
        if (events) {
          return getEventScripts(events, "clickMenuItem")
        }
        return []
      },
      [realProps],
    )

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

    const handleOnFocus = useCallback(() => {
      getOnFocusEventScripts().forEach((scriptObj) => {
        runEventHandler(scriptObj, BUILDER_CALC_CONTEXT)
      })
    }, [getOnFocusEventScripts])

    const handleOnBlur = useCallback(() => {
      getOnBlurEventScripts().forEach((scriptObj) => {
        runEventHandler(scriptObj, BUILDER_CALC_CONTEXT)
      })
    }, [getOnBlurEventScripts])

    const handleOnClickMenuItem = useCallback(
      (path: string) => {
        getOnClickMenuItemEventScripts(path).forEach((scriptObj) => {
          runEventHandler(scriptObj, BUILDER_CALC_CONTEXT)
        })
      },
      [getOnClickMenuItemEventScripts],
    )

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

    const handleOnRowSelect = useCallback(() => {
      const originEvents = get(componentNode.props, "events", [])
      const dynamicPaths = get(componentNode.props, "$dynamicAttrPaths", [])
      const needRunEvents = cloneDeep(originEvents)
      dynamicPaths?.forEach((path: string) => {
        const realPath = path.split(".").slice(1).join(".")
        try {
          const dynamicString = get(needRunEvents, realPath, "")
          if (dynamicString) {
            const calcValue = evaluateDynamicString(
              "",
              dynamicString,
              BUILDER_CALC_CONTEXT,
            )
            set(needRunEvents, realPath, calcValue)
          }
        } catch (e) {
          console.log(e)
        }
      })
      needRunEvents.forEach((scriptObj: any) => {
        runEventHandler(scriptObj, BUILDER_CALC_CONTEXT)
      })
    }, [componentNode.props])

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
          handleOnChange={handleOnChange}
          handleOnClick={handleOnClick}
          handleOnClickMenuItem={handleOnClickMenuItem}
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
          handleOnFocus={handleOnFocus}
          handleOnBlur={handleOnBlur}
          handleOnRowSelect={handleOnRowSelect}
          disabled={listContainerDisabled}
          handleOnOpenModal={handleOnOpenModal}
          handleOnCloseModal={handleOnCloseModal}
        />
      </div>
    )
  },
)

TransformWidgetWrapper.displayName = "TransformWidgetWrapper"
