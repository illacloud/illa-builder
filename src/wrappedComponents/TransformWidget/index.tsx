import { FC, useContext, useEffect, useMemo, useRef } from "react"
import { widgetBuilder } from "@/wrappedComponents/WidgetBuilder"
import { TransformWidgetProps } from "@/wrappedComponents/TransformWidget/interface"
import { GLOBAL_DATA_CONTEXT } from "@/page/App/context/globalDataProvider"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { EventsInProps } from "@/wrappedComponents/interface"

const getEventScripts = (events: EventsInProps[], eventType: string) => {
  const filterEvents = events.filter((event) => {
    return event.eventType === eventType
  })
  return filterEvents.map((event) => {
    return event
  })
}

export const TransformWidget: FC<TransformWidgetProps> = (props) => {
  const { componentNode, ...otherProps } = props

  const { handleUpdateGlobalData, globalData } = useContext(GLOBAL_DATA_CONTEXT)

  const handleUpdateDsl = (value: Record<string, any>) => {}

  const ref = useRef<Record<string, any>>()

  useEffect(() => {
    if (ref.current) {
      const widgetName = componentNode.displayName
      handleUpdateGlobalData(widgetName, { ...ref.current, type: "widget" })
    }
  }, [])

  const getOnChangeEventScripts = () => {
    if (componentNode.props && componentNode.props.events) {
      return getEventScripts(componentNode.props.events, "onChange")
    }
    return []
  }

  const handleOnChange = () => {
    getOnChangeEventScripts().forEach((scriptObj) => {
      const { enabled, script } = scriptObj
      if (!enabled) {
        evaluateDynamicString("events", script, globalData)
      }
      if (enabled && evaluateDynamicString("events", enabled, globalData))
        evaluateDynamicString("events", script, globalData)
    })
  }

  const ChildComponent = useMemo(() => {
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
  }, [componentNode])

  return ChildComponent
}
