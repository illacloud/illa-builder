import { authCloudRequest } from "@illa-public/illa-net"
import { CurrentUserInfo } from "@illa-public/public-types"

interface updateUserPasswordRequestData {
  currentPassword: string
  newPassword: string
}

export const fetchUpdateUserPassword = (
  data: updateUserPasswordRequestData,
) => {
  return authCloudRequest({
    url: "/users/password",
    method: "PATCH",
    data,
  })
}

export const fetchUpdateUserLanguage = (language: string) => {
  return authCloudRequest({
    url: "/users/language",
    method: "PATCH",
    data: {
      language,
    },
  })
}

export const fetchUpdateNickName = (nickname: string) => {
  return authCloudRequest({
    url: "/users/nickname",
    method: "PATCH",
    data: {
      nickname,
    },
  })
}

export const fetchUserInfo = async () => {
  return await authCloudRequest<CurrentUserInfo>({
    url: "/users",
    method: "GET",
  })
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
