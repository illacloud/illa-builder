import { FC, useCallback, memo } from "react"
import { AddIcon } from "@illa-design/icon"
import {
  fontButtonStyle,
  fontButtonWrapperStyle,
  headerWrapperStyle,
} from "./style"
import { EventHandlerSetterHeaderProps } from "./interface"
import { PanelLabel } from "@/page/App/components/InspectPanel/label"
import { useTranslation } from "react-i18next"

export const EventHandlerSetterHeader: FC<EventHandlerSetterHeaderProps> = memo(
  (props) => {
    const { labelName, labelDesc, handleAddItemAsync } = props
    const { t } = useTranslation()

    const handleClickNewButton = useCallback(() => {
      handleAddItemAsync()
    }, [handleAddItemAsync])

    return (
      <div css={headerWrapperStyle}>
        <PanelLabel labelName={labelName} labelDesc={labelDesc} />
        <div css={fontButtonWrapperStyle} onClick={handleClickNewButton}>
          <AddIcon />
          <span css={fontButtonStyle}>
            {t("editor.inspect.setter_content.event_handler_list.new")}
          </span>
        </div>
      </div>
    )
  },
)

EventHandlerSetterHeader.displayName = "EventHandlerSetterHeader"
