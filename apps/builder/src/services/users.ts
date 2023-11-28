import {
  authCloudRequest,
  notNeedAuthCloudRequest,
} from "@illa-public/illa-net"
import { CurrentUserInfo } from "@illa-public/public-types"
import { getAuthToken } from "@illa-public/utils"

export const fetchUserInfo = () => {
  return authCloudRequest<CurrentUserInfo>({
    url: "/users",
  })
}

export const tryFetchUserInfo = async () => {
  const token = getAuthToken()

  try {
    return await notNeedAuthCloudRequest<CurrentUserInfo>({
      url: "/users",
      headers: {
        Authorization: token,
      },
    })
  } catch (e) {
    return undefined
  }
}

export const updateTutorialViewed = async (isTutorialViewed: boolean) => {
  await authCloudRequest({
    url: "/users/tutorialViewed",
    method: "PATCH",
    data: {
      isTutorialViewed,
    },
  })
}
