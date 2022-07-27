import { FC } from "react"
import { actionEventHandlerStyle } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler/style"
import { useTranslation } from "react-i18next"

export const ActionEventHandler: FC = () => {
  const { t } = useTranslation()

  return (
    <div css={actionEventHandlerStyle}>
      {t("editor.action.panel.label.event_handler")}
    </div>
  )
}

ActionEventHandler.displayName = "ActionEventHandler"
