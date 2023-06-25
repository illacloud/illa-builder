import { matchPath } from "react-router-dom"
import { ERROR_FLAG } from "@/api/errorFlag"
import { cloudUrl } from "@/router/constant"
import { isCloudVersion, isILLAAPiError } from "@/utils/typeHelper"

export const commonBillingErrorHandler = (error: unknown) => {
  if (isILLAAPiError(error) && isCloudVersion) {
    switch (error.data.errorFlag) {
      case ERROR_FLAG.ERROR_FLAG_ACCESS_DENIED:
      // [TODO] @xiaoyu need to remove this case after check
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
