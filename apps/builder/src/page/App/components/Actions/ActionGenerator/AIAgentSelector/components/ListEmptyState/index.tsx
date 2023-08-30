import { FC } from "react"
import { useTranslation } from "react-i18next"
import { ReactComponent as EmptyIcon } from "./emptyIcon.svg"
import { emptyContainerStyle, emptyTipsStyle } from "./style"

export const ListEmptyState: FC = () => {
  const { t } = useTranslation()
  return (
    <div css={emptyContainerStyle}>
      <EmptyIcon />
      <span css={emptyTipsStyle}>{t("dashboard.no-result")}</span>
    </div>
  )
}
