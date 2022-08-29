import { FC, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { get } from "lodash"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import { TransformWidgetProps } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/interface"
import { GLOBAL_DATA_CONTEXT } from "@/page/App/context/globalDataProvider"
import { EventsInProps } from "@/widgetLibrary/interface"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { runEventHandler } from "@/utils/eventHandlerHelper"
import { applyHiddenWrapperStyle } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"

export const getEventScripts = (events: EventsInProps[], eventType: string) => {
  return events.filter((event) => {
    return event.eventType === eventType
  })
}

export const TransformWidgetWrapper: FC<TransformWidgetProps> = (props) => {
  const { componentNode } = props

  const { displayName, type, w, h, unitW, unitH } = componentNode

  const displayNameMapProps = useSelector(getExecutionResult)
  const { handleUpdateGlobalData, handleDeleteGlobalData, globalData } =
    useContext(GLOBAL_DATA_CONTEXT)
  const dispatch = useDispatch()

  const realProps = displayNameMapProps[displayName] ?? {}
  if (!type) return null
  const COMP = widgetBuilder(type).widget
  if (!COMP) return null

  const handleUpdateDsl = (value: Record<string, any>) => {
    dispatch(
      executionActions.updateExecutionByDisplayNameReducer({
        displayName,
        value,
      }),
    )
  }

  const getOnChangeEventScripts = () => {
    const events = get(realProps, "events")
    if (events) {
      return getEventScripts(events, "change")
    }
    return []
  }

  const getOnClickEventScripts = () => {
    const events = get(realProps, "events")
    if (events) {
      return getEventScripts(events, "click")
    }
    return []
  }

  const handleOnChange = () => {
    getOnChangeEventScripts().forEach((scriptObj) => {
      runEventHandler(scriptObj, globalData)
    })
  }

  const handleOnClick = () => {
    getOnClickEventScripts().forEach((scriptObj) => {
      runEventHandler(scriptObj, globalData)
    })
  }

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
        handleUpdateDsl={handleUpdateDsl}
        displayName={displayName}
      />
    </div>
  )
}
