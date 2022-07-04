import { FC, useContext, useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import { TransformWidgetProps } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/interface"
import { GLOBAL_DATA_CONTEXT } from "@/page/App/context/globalDataProvider"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { EventsInProps } from "@/widgetLibrary/interface"
import { getExecutionResult } from "@/redux/currentApp/executionTree/execution/executionSelector"
import { isObject } from "@/utils/typeHelper"
import { executionActions } from "@/redux/currentApp/executionTree/execution/executionSlice"
import { BasicWrapper } from "@/widgetLibrary/PublicSector/BasicWrapper"
import Label from "@/widgetLibrary/PublicSector/Label"

const getEventScripts = (events: EventsInProps[], eventType: string) => {
  return events.filter((event) => {
    return event.eventType === eventType
  })
}

export const TransformWidgetWrapper: FC<TransformWidgetProps> = (props) => {
  const { componentNode, ...otherProps } = props

  const { displayName, type } = componentNode

  const displayNameMapProps = useSelector(getExecutionResult)

  const { handleUpdateGlobalData, globalData } = useContext(GLOBAL_DATA_CONTEXT)

  const dispatch = useDispatch()

  const handleUpdateDsl = (value: Record<string, any>) => {
    dispatch(
      executionActions.updateExecutionByDisplayNameReducer({
        displayName,
        value,
      }),
    )
  }

  const ref = useRef<Record<string, any>>()

  useEffect(() => {
    if (ref.current) {
      handleUpdateGlobalData(componentNode.displayName, {
        ...ref.current,
        type: "widget",
      })
    }
  }, [])

  const getOnChangeEventScripts = () => {
    if (componentNode.props?.events) {
      return getEventScripts(componentNode.props.events, "onChange")
    }
    return []
  }

  const handleOnChange = () => {
    getOnChangeEventScripts().forEach((scriptObj) => {
      const { enabled, script } = scriptObj
      if (enabled == "undefined") {
        evaluateDynamicString("events", script, globalData)
        return
      }
      if (
        typeof enabled === "string" &&
        evaluateDynamicString("events", enabled, globalData)
      ) {
        evaluateDynamicString("events", script, globalData)
      }
    })
  }

  const realProps = useMemo(() => {
    const result: Record<string, any> = {}
    const calcProps = displayNameMapProps[displayName] ?? {}
    Object.keys(calcProps).forEach((key) => {
      // TODO: weichen move to evalTree
      if (isObject(calcProps[key] && key !== "styles")) {
        result[key] = JSON.stringify(calcProps[key])
      } else {
        result[key] = calcProps[key]
      }
    })
    return result
  }, [displayNameMapProps, displayName])

  if (!type) return null
  const COMP = widgetBuilder(type).widget
  if (!COMP) return null

  const {
    tooltipText,
    label,
    labelAlign,
    labelWidth,
    labelPosition,
    labelCaption,
    labelWidthUnit,
    required,
    hidden,
  } = realProps
  return (
    <BasicWrapper
      tooltipText={tooltipText}
      hidden={hidden}
      labelPosition={labelPosition}
    >
      <Label
        label={label}
        labelAlign={labelAlign}
        labelWidth={labelWidth}
        labelCaption={labelCaption}
        labelWidthUnit={labelWidthUnit}
        labelPosition={labelPosition}
        required={required}
      />
      <COMP
        {...realProps}
        handleOnChange={handleOnChange}
        handleUpdateDsl={handleUpdateDsl}
        ref={ref}
      />
    </BasicWrapper>
  )
}
