import { BuilderApi } from "@/api/base"
import { AccessType } from "@/redux/resource/googleSheetResource"
import { ILLABuilderStorage } from "@/utils/storage"

export const getOAuthAccessToken = async (
  resourceId: string,
  redirectURL: string,
  accessType: AccessType,
) => {
  try {
    const response = await BuilderApi.asyncTeamRequest<{
      accessToken: string
    }>({
      method: "POST",
      url: `/resources/${resourceId}/token`,
      data: {
        accessType,
        redirectURL,
      },
    })
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
  return BuilderApi.asyncTeamRequest({
    method: "POST",
    url: `/resources/${resourceId}/oauth2`,
    data: {
      accessToken,
    },
  })
}
