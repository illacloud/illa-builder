import { FC } from "react"
import { useTranslation } from "react-i18next"
import { emptyContainerStyle } from "./style"

export const EmptyState: FC = () => {
  const { t } = useTranslation()
  return <div css={emptyContainerStyle}>{t("widget.page.tips.blank_view")}</div>
}
