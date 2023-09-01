import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { useMessage } from "@illa-design/react"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import { GoogleSheetAuthStatus } from "@/redux/resource/googleSheetResource"

export const useGoogleAuthStatus = (
  finished?: (resourceID: string) => void,
) => {
  const location = useLocation()
  const message = useMessage()
  const actions = useSelector(getActionList)
  const { t } = useTranslation()

  const urlParams = new URLSearchParams(location.search)
  const status = urlParams.get("status")
  const resourceID = urlParams.get("resourceID")

  useEffect(() => {
    if (resourceID == undefined || status == undefined) {
      return
    }
    // redirect url: 1 success, 2 failed, reverse with resource
    if (status === String(GoogleSheetAuthStatus.NotAuthenticated)) {
      message.success({
        content: t("editor.action.form.tips.gs.successfully_authent"),
      })
    } else {
      message.error({
        content: t("editor.action.form.tips.gs.failed_to_authentica"),
      })
    }
    finished?.(resourceID)
  }, [actions, finished, message, resourceID, status, t])
}
