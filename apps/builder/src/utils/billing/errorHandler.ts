import { ERROR_FLAG } from "@/api/errorFlag"
import { cloudUrl } from "@/router/constant"
import { isCloudVersion, isILLAAPiError } from "@/utils/typeHelper"

export const commonBillingErrorHandler = (error: unknown) => {
  if (isILLAAPiError(error) && isCloudVersion) {
    switch (error.data.errorFlag) {
      case ERROR_FLAG.ERROR_FLAG_ACCESS_DENIED:
        window.location.href = cloudUrl
        break
    }
  }
}
