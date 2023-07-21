import React, { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Button, ExitIcon } from "@illa-design/react"
import { ReactComponent as Logo } from "@/assets/illa-logo.svg"
import {
  informationStyle,
  logoCursorStyle,
  nameStyle,
  navBarStyle,
  rowCenter,
} from "@/page/App/components/PageNavBar/style"
import { navDescStyle } from "@/page/History/components/HistoryNavBar/style"
import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"

export const HistoryNavBar: FC = () => {
  const navigate = useNavigate()
  const { teamIdentifier, appId } = useParams()
  const { t } = useTranslation()

  const appInfo = useSelector(getAppInfo)

  const handleLogoClick = useCallback(() => {
    navigate(`/${teamIdentifier}/dashboard/apps`)
  }, [navigate, teamIdentifier])

  const exitHistory = useCallback(() => {
    window.location.href = `/${teamIdentifier}/app/${appId}`
  }, [teamIdentifier, appId])

  return (
    <div css={navBarStyle}>
      <div css={rowCenter}>
        <Logo width="34px" onClick={handleLogoClick} css={logoCursorStyle} />
        <div css={informationStyle}>
          <div css={nameStyle}>{appInfo.appName}</div>
        </div>
      </div>
      <span css={navDescStyle}>{t("editor.history.history_list.label")}</span>
      <Button
        minW="200px"
        colorScheme="techPurple"
        leftIcon={<ExitIcon />}
        onClick={exitHistory}
      >
        {t("exit_preview")}
      </Button>
    </div>
  )
}
