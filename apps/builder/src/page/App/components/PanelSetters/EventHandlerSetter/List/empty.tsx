import { FC, memo } from "react"
import { useTranslation } from "react-i18next"
import { emptyBodyStyle } from "@/page/App/components/PanelSetters/EventHandlerSetter/List/style"

export const EventHandlerEmpty: FC = memo(() => {
  const { t } = useTranslation()
  return (
    <div css={emptyBodyStyle}>
      {t("editor.inspect.setter_content.event_handler_list.empty")}
    </div>
  )
})

EventHandlerEmpty.displayName = "EventHandlerEmpty"
