import { FC } from "react"
import { useTranslation } from "react-i18next"
import { viewListEmptyBody } from "./style"

export const EmptyState: FC = () => {
  const { t } = useTranslation()
  return (
    <div css={viewListEmptyBody}>{t("editor.inspect.page.blank_view")}</div>
  )
}
