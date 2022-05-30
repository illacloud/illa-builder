import { handlerTitleStyle } from "../style"
import { EventInstance } from "./EventInstance"
import { useTranslation } from "react-i18next"

export const EventHandler = () => {
  const { t } = useTranslation()

  return (
    <>
      <div>
        <div css={handlerTitleStyle}>
          {t("editor.action.panel.label.eventHandler")}
        </div>
        <EventInstance title={t("editor.action.panel.label.success")} />
        <EventInstance title={t("editor.action.panel.label.failure")} />
      </div>
    </>
  )
}
