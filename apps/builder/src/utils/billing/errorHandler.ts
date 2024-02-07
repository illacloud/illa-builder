import { ERROR_FLAG, isILLAAPiError } from "@illa-public/illa-net"
import { getILLACloudURL, isCloudVersion } from "@illa-public/utils"
import { matchPath } from "react-router-dom"

export const commonBillingErrorHandler = (error: unknown) => {
  if (isILLAAPiError(error) && isCloudVersion) {
    switch (error.data.errorFlag) {
      case ERROR_FLAG.ERROR_FLAG_ACCESS_DENIED:
        break
      case ERROR_FLAG.ERROR_FLAG_CAN_NOT_TEST_RESOURCE_CONNECTION:
        const match = matchPath("/:teamIdentifier/*", location.pathname)
        const teamIdentifier = match?.params?.teamIdentifier
        window.location.href = teamIdentifier
          ? `${getILLACloudURL(
              window.customDomain,
            )}/workspace/${teamIdentifier}`
          : getILLACloudURL(window.customDomain)
        break
    }
  }
}
