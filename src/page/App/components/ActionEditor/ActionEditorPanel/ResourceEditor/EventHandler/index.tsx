import { useTranslation } from "react-i18next"
import { handlerTitleStyle } from "@/page/App/components/ActionEditor/ActionEditorPanel/style"
import { EventInstance } from "./EventInstance"

export const EventHandler = () => {
  const { t } = useTranslation()

  return (
    <>
      <div>
        <div css={handlerTitleStyle}>
          {t("editor.action.panel.label.event_handler")}
        </div>
        <EventInstance title={t("editor.action.panel.label.success")} />
        <EventInstance title={t("editor.action.panel.label.failure")} />
      </div>
    </>
  )
}
