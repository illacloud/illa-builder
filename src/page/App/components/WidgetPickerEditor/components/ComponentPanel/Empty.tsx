import { FC } from "react"
import { EmptyStateIcon } from "@illa-design/icon"
import { emptyStyle, emptyTipStyle } from "./style"
import { useTranslation } from "react-i18next"

export const Empty: FC = () => {
  const { t } = useTranslation()

  return (
    <div css={emptyStyle}>
      <EmptyStateIcon size="48px" />
      <span css={emptyTipStyle}>{t("editor.widget_picker.empty_tip")}</span>
    </div>
  )
}

Empty.displayName = "Empty"
