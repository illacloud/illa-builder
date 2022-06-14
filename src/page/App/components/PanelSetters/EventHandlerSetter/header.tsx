import { FC, useCallback } from "react"
import {
  fontButtonCss,
  fontButtonWrapperCss,
  headerWrapperCss,
} from "@/page/App/components/PanelSetters/EventHandlerSetter/style"
import { PanelLabel } from "@/page/App/components/InspectPanel/label"
import { AddIcon } from "@illa-design/icon"
import { EventHandlerSetterHeaderProps } from "@/page/App/components/PanelSetters/EventHandlerSetter/interface"
import { v4 } from "uuid"
import { dispatch } from "use-bus"

export const EventHandlerSetterHeader: FC<EventHandlerSetterHeaderProps> = (
  props,
) => {
  const { labelName, labelDesc, events, handleAddItemAsync } = props

  const handleClickNewButton = useCallback(() => {
    const length = events.length
    const event = "onChange" // 从配置项获取。
    const targetId = "" // 从 redux 中读取
    handleAddItemAsync({
      id: `events-${v4()}`,
      event,
      type: "datasource",
      method: "trigger",
      targetId,
      waitMs: 0,
      waitType: "debounce",
    }).then(() => {
      dispatch("CLOSE_EVENT_LIST_ALL_MODAL")
      dispatch(`OPEN_EVENT_LIST_ITEM_MODAL_${length}`)
    })
  }, [events, handleAddItemAsync])

  return (
    <div css={headerWrapperCss}>
      <PanelLabel labelName={labelName} labelDesc={labelDesc} />
      <div css={fontButtonWrapperCss}>
        <AddIcon />
        <span css={fontButtonCss} onClick={handleClickNewButton}>
          New
        </span>
      </div>
    </div>
  )
}
