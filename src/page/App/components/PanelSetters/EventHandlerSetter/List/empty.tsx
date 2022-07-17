import { FC } from "react"
import { emptyBodyStyle } from "@/page/App/components/PanelSetters/EventHandlerSetter/List/style"
import { useTranslation } from "react-i18next"

export const EventHandlerEmpty: FC = () => {
  const { t } = useTranslation()
  return (
    <div css={emptyBodyStyle}>
      {t("editor.inspect.setter_content.event_handler_list.empty")}
    </div>
  )
}

EventHandlerEmpty.displayName = "EventHandlerEmpty"
