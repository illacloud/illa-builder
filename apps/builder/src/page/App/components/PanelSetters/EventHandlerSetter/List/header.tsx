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
import { globalColor, illaPrefix } from "@illa-design/theme"
import { Button } from "@illa-design/button"

export const EventHandlerSetterHeader: FC<EventHandlerSetterHeaderProps> = memo(
  props => {
    const { labelName, labelDesc, handleAddItemAsync } = props
    const { t } = useTranslation()

    const handleClickNewButton = useCallback(() => {
      handleAddItemAsync()
    }, [handleAddItemAsync])

    return (
      <div css={headerWrapperStyle}>
        <PanelLabel labelName={labelName} labelDesc={labelDesc} />
        <Button
          pd="1px 8px"
          colorScheme="techPurple"
          size="medium"
          variant="text"
          onClick={() => {
            handleClickNewButton()
          }}
          leftIcon={
            <AddIcon color={globalColor(`--${illaPrefix}-techPurple-08`)} />
          }
        >
          {t("editor.inspect.setter_content.event_handler_list.new")}
        </Button>
      </div>
    )
  },
)

EventHandlerSetterHeader.displayName = "EventHandlerSetterHeader"
