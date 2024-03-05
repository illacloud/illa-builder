import { convertPathToString } from "@illa-public/dynamic-string"
import { klona } from "klona"
import { get, isFunction, isNumber, set, toPath } from "lodash-es"
import { FC, Suspense, memo, useCallback, useMemo } from "react"
import { useDispatch } from "react-redux"
import { Skeleton } from "@illa-design/react"
import ErrorBoundary from "@/components/ErrorBoundary"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { runEventHandler } from "@/utils/eventHandlerHelper"
import { ILLAEditorRuntimePropsCollectorInstance } from "@/utils/executionTreeHelper/runtimePropsCollector"
import { isObject } from "@/utils/typeHelper"
import { TransformWidgetWrapperWithJsonProps } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/interface"
import { applyWrapperStylesStyle } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { EventsInProps } from "@/widgetLibrary/interface"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"

export const getEventScripts = (events: EventsInProps[], eventType: string) => {
  return events.filter((event) => {
    return event.eventType === eventType
  })
}

export const TransformWidgetWrapperWithJson: FC<TransformWidgetWrapperWithJsonProps> =
  memo((props: TransformWidgetWrapperWithJsonProps) => {
    const { componentNode, unitW } = props

    const {
      displayName,
      type,
      w,
      h,
      childrenNode,
      props: nodeProps,
    } = componentNode

    const dispatch = useDispatch()

    const updateComponentRuntimeProps = useCallback(
      (runtimeProp: unknown) => {
        ILLAEditorRuntimePropsCollectorInstance.addRuntimeProp(
          displayName,
          runtimeProp,
        )
      },
      [displayName],
    )

    const deleteComponentRuntimeProps = useCallback(() => {
      ILLAEditorRuntimePropsCollectorInstance.deleteRuntimeProp(displayName)
    }, [displayName])

    const realProps = useMemo(() => nodeProps ?? {}, [nodeProps])

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
      (updateSlice: Record<string, any>, notUseUndoRedo?: boolean) => {
        if (!isObject(updateSlice)) return
        dispatch(
          componentsActions.updateComponentPropsReducer({
            displayName: displayName,
            updateSlice,
            notUseUndoRedo,
          }),
        )
      },
      [dispatch, displayName],
    )

    const handleUpdateOriginalDSLOtherMultiAttr = useCallback(
      (
        displayName: string,
        updateSlice: Record<string, any>,
        notUseUndoRedo?: boolean,
      ) => {
        if (!displayName || !isObject(updateSlice)) return
        dispatch(
          componentsActions.updateComponentPropsReducer({
            displayName,
            updateSlice,
            notUseUndoRedo,
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
        const needRunEvents = klona(originEvents)
          .filter((originEvent) => {
            return originEvent.eventType === eventType
          })
          .map((originEvent) => {
            return {
              ...originEvent,
              originEnable: originEvent.enabled,
            }
          })
        const finalContext =
          ILLAEditorRuntimePropsCollectorInstance.getCurrentPageCalcContext(
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
            : convertPathToString(toPath(path).slice(1))

          const dynamicString = get(needRunEvents, realPath, "")
          if (dynamicString) {
            try {
              const calcValue = evaluateDynamicString(
                "",
                dynamicString,
                finalContext,
              )
              set(needRunEvents, realPath, calcValue)
            } catch {
              set(needRunEvents, realPath, undefined)
            }
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
          const realPath = convertPathToString(toPath(path).slice(2))
          const dynamicString = get(needRunEvents, realPath, "")
          if (dynamicString) {
            try {
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
            } catch {
              set(needRunEvents, realPath, undefined)
            }
          }
        })
        needRunEvents.forEach((scriptObj: any) => {
          runEventHandler(scriptObj, finalContext)
        })
      },
      [getRunEvents],
    )

    if (!type) return null
    const widgetConfig = widgetBuilder(type)
    if (!widgetConfig) return null
    const Component = widgetConfig.widget

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

    return (
      <ErrorBoundary>
        {hidden ? null : (
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
            <Suspense
              fallback={
                <Skeleton
                  animation
                  text={false}
                  image={{
                    shape: "square",
                    w: "100%",
                    h: "100%",
                    mr: "0 !important",
                  }}
                  h="100%"
                  w="100%"
                />
              }
            >
              <Component
                {...realProps}
                w={w}
                h={h}
                unitW={unitW}
                unitH={UNIT_HEIGHT}
                updateComponentRuntimeProps={updateComponentRuntimeProps}
                deleteComponentRuntimeProps={deleteComponentRuntimeProps}
                handleUpdateOriginalDSLMultiAttr={
                  handleUpdateOriginalDSLMultiAttr
                }
                handleUpdateOriginalDSLOtherMultiAttr={
                  handleUpdateOriginalDSLOtherMultiAttr
                }
                handleUpdateDsl={handleUpdateDsl}
                handleUpdateMultiExecutionResult={
                  handleUpdateMultiExecutionResult
                }
                displayName={displayName}
                childrenNode={childrenNode}
                componentNode={componentNode}
                triggerEventHandler={triggerEventHandler}
                triggerMappedEventHandler={triggerMappedEventHandler}
              />
            </Suspense>
          </div>
        )}
      </ErrorBoundary>
    )
  })

TransformWidgetWrapperWithJson.displayName = "TransformWidgetWrapper"
