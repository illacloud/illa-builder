import { ERROR_FLAG } from "@illa-public/illa-net/errorFlag"
import { isCloudVersion } from "@illa-public/utils"
import { matchPath } from "react-router-dom"
import { createMessage } from "@illa-design/react"
import i18n from "@/i18n/config"
import { cloudUrl } from "@/router/constant"
import { isILLAAPiError } from "@/utils/typeHelper"


const message = createMessage()
export const commonBillingErrorHandler = (error: unknown) => {
  if (isILLAAPiError(error) && isCloudVersion) {
    switch (error.data.errorFlag) {
      case ERROR_FLAG.ERROR_FLAG_ACCESS_DENIED:
        break
      case ERROR_FLAG.ERROR_FLAG_CAN_NOT_TEST_RESOURCE_CONNECTION:
        const match = matchPath("/:teamIdentifier/*", location.pathname)
        const teamIdentifier = match?.params?.teamIdentifier
        window.location.href = teamIdentifier
          ? `${cloudUrl}/workspace/${teamIdentifier}`
          : cloudUrl
        break
    }
  }
}

export const leaveTeamErrorHandler = (error: unknown) => {
  if (isILLAAPiError(error)) {
    switch (error.data.errorFlag) {
      case ERROR_FLAG.ERROR_FLAG_CAN_NOT_REMOVE_TEAM_MEMBER_BECAUSE_APPSUMO_BUYER:
        message.error({
          content: i18n.t("billing.message.appsumo.leave"),
        })
        break
      case ERROR_FLAG.ERROR_FLAG_CAN_NOT_REMOVE_OWNER_FROM_TEAM:
        location.reload()
        break
      default:
        message.error({
          content: i18n.t("team_setting.mes.leave_fail"),
        })
        break
    }
  }
}