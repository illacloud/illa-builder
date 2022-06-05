import { FC, useContext, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { dslActions } from "@/redux/currentApp/editor/dsl/dslSlice"
import { GLOBAL_DATA_CONTEXT } from "@/page/Editor/context/globalDataProvider"
import { EventsInProps } from "@/wrappedComponents/DraggableComponent/interface"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"

function getDisplayName(WrappedComponent: FC<any>) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component"
}

const getEventScripts = (events: EventsInProps[], eventType: string) => {
  const filterEvents = events.filter((event) => {
    return event.eventType === eventType
  })
  return filterEvents.map((event) => {
    return event
  })
}

// TODO: wait to use a component,not a HOC
export function withParser<T>(WrappedComponent: FC<T>): FC<T> {
  const ParseredComponent: FC<any> = (dsl) => {
    // tips: this is parsers,when dsl version update,can add new parser to this
    // and also can add some Component parser,when component structural changed
    const { props } = dsl
    const { hidden } = props
    const ref = useRef<Record<string, any>>()
    const dispatch = useDispatch()

    const { handleUpdateGlobalData, globalData } =
      useContext(GLOBAL_DATA_CONTEXT)

    const getOnChangeEventScripts = () => {
      const { events } = props
      if (events) {
        return getEventScripts(events, "onChange")
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

    //TODO: @weichen wait new dsl action
    const handleUpdateDsl = (value: Record<string, any>) => {
      dispatch(
        dslActions.updateDslProps({
          targetId: dsl.id,
          newState: {
            ...value,
          },
        }),
      )
    }

    useEffect(() => {
      console.log("ref.current", ref.current)
      if (ref.current) {
        // TODO:@weichen the key use widgetDisplayName
        const widgetName = dsl.id.split("-").join("")
        handleUpdateGlobalData(widgetName, { ...ref.current, type: "widget" })
      }
    }, [])

    return (
      <div
        hidden={hidden && hidden !== "false"}
        style={{ height: "100%", width: "100%" }}
      >
        <WrappedComponent
          {...props}
          handleUpdateDsl={handleUpdateDsl}
          ref={ref}
          handleOnChange={handleOnChange}
        />
      </div>
    )
  }

  ParseredComponent.displayName = `withParser(${getDisplayName(
    WrappedComponent,
  )})`

  return ParseredComponent
}
