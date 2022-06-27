import { FC, useContext, useEffect, useMemo, useRef } from "react"
import { widgetBuilder } from "@/wrappedComponents/WidgetBuilder"
import { TransformWidgetProps } from "@/wrappedComponents/TransformWidget/interface"
import { GLOBAL_DATA_CONTEXT } from "@/page/App/context/globalDataProvider"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { EventsInProps } from "@/wrappedComponents/interface"

const getEventScripts = (events: EventsInProps[], eventType: string) => {
  return events.filter((event) => {
    return event.eventType === eventType
  })
}

export const TransformWidget: FC<TransformWidgetProps> = (props) => {
  const { componentNode, ...otherProps } = props

  const { handleUpdateGlobalData, globalData } = useContext(GLOBAL_DATA_CONTEXT)

  const handleUpdateDsl = (value: Record<string, any>) => {}

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

  const { type, props: componentNodeProps = {} } = componentNode
  if (!type) return null
  const COMP = widgetBuilder(type).widget
  if (!COMP) return null
  return (
    <COMP
      {...componentNodeProps}
      handleOnChange={handleOnChange}
      handleUpdateDsl={handleUpdateDsl}
      ref={ref}
    />
  )
}
