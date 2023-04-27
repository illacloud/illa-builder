import { builderRequest } from "@/api/http"
import { AccessType } from "@/redux/resource/googleSheetResource"
import { ILLABuilderStorage } from "@/utils/storage"

export const getOAuthAccessToken = async (
  resourceId: string,
  redirectURL: string,
  accessType: AccessType,
) => {
  try {
    const response = await builderRequest<{
      accessToken: string
    }>(
      {
        method: "POST",
        url: `/resources/${resourceId}/token`,
        data: {
          accessType,
          redirectURL,
        },
      },
      {
        needTeamID: true,
      },
    )
    const { accessToken } = response.data
    ILLABuilderStorage.setLocalStorage("accessToken", accessToken)
    await redirectToGoogleOAuth(resourceId, accessToken)
  } catch (e) {
    ILLABuilderStorage.removeLocalStorage("accessToken")
  }
}

export const redirectToGoogleOAuth = async (
  resourceId: string,
  accessToken: string,
) => {
  return builderRequest(
    {
      method: "POST",
      url: `/resources/${resourceId}/oauth2`,
      data: {
        accessToken,
      },
    },
    {
      needTeamID: true,
    },
  )
}
