import { GoogleSheetAuthStatus } from "@illa-public/public-types"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { useMessage } from "@illa-design/react"
import { getActionList } from "@/redux/currentApp/action/actionSelector"

export const useGoogleAuthStatus = (
  finished?: (resourceID: string) => void,
) => {
  const message = useMessage()
  const actions = useSelector(getActionList)
  const { t } = useTranslation()
  const [urlParams, setUrlParams] = useSearchParams()

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
    urlParams.delete("status")
    urlParams.delete("resourceID")
    setUrlParams(urlParams)
    finished?.(resourceID)
  }, [
    actions,
    finished,
    message,
    resourceID,
    setUrlParams,
    status,
    t,
    urlParams,
  ])
}
