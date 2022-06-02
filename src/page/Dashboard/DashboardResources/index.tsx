import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@illa-design/button"
import {
  appsContainerStyle,
  listTitleContainerStyle,
  listTitleStyle,
} from "@/page/Dashboard/DashboardApps/style"

export const DashboardResources: FC = () => {
  const { t } = useTranslation()

  return (
    <div css={appsContainerStyle}>
      <div css={listTitleContainerStyle}>
        <span css={listTitleStyle}>{t("resources")}</span>
        <Button colorScheme="techPurple">{t("create_new")}</Button>
      </div>
    </div>
  )
}

DashboardResources.displayName = "DashboardResources"
