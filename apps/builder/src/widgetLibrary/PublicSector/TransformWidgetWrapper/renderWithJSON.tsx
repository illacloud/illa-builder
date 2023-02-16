import { merge } from "chart.js/helpers"
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
import { EventsInProps } from "@/widgetLibrary/interface"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"

export const getEventScripts = (events: EventsInProps[], eventType: string) => {
  return events.filter((event) => {
    return event.eventType === eventType
  })
}

export const TransformWidgetWrapperWithJson: FC<TransformWidgetProps> = memo(
  (props: TransformWidgetProps) => {
    const { componentNode } = props

    const {
      displayName,
      type,
      w,
      h,
      unitW,
      unitH,
      childrenNode,
      props: nodeProps,
    } = componentNode

    const { handleUpdateGlobalData, handleDeleteGlobalData } =
      useContext(GLOBAL_DATA_CONTEXT)
    const dispatch = useDispatch()

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
          handleUpdateGlobalData={handleUpdateGlobalData}
          handleDeleteGlobalData={handleDeleteGlobalData}
          handleUpdateOriginalDSLMultiAttr={handleUpdateOriginalDSLMultiAttr}
          handleUpdateOriginalDSLOtherMultiAttr={
            handleUpdateOriginalDSLOtherMultiAttr
          }
          handleUpdateDsl={handleUpdateDsl}
          handleUpdateMultiExecutionResult={handleUpdateMultiExecutionResult}
          displayName={displayName}
          childrenNode={childrenNode}
          componentNode={componentNode}
          triggerEventHandler={triggerEventHandler}
        />
      </div>
    )
  },
)

TransformWidgetWrapperWithJson.displayName = "TransformWidgetWrapper"
