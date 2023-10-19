import {
  authCloudRequest,
  notNeedAuthCloudRequest,
} from "@illa-public/illa-net"
import { CurrentUser } from "@illa-public/user-data"
import { getAuthToken } from "@illa-public/utils"

export const fetchUserInfo = () => {
  return authCloudRequest<CurrentUser>({
    url: "/users",
  })
}

export const tryFetchUserInfo = async () => {
  const token = getAuthToken()

  try {
    return await notNeedAuthCloudRequest<CurrentUser>({
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
