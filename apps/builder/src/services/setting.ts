import { authCloudRequest } from "@/api/http"
import {
  CurrentUser,
  UserInfoResponse,
} from "@/redux/currentUser/currentUserState"

export const fetchChangeNickname = (nickname: string) => {
  return authCloudRequest<UserInfoResponse>({
    url: "/users/nickname",
    method: "PATCH",
    data: {
      nickname,
    },
  })
}

export const fetchChangeLanguage = (language: string) => {
  return authCloudRequest<CurrentUser>({
    url: "/users/language",
    method: "PATCH",
    data: {
      language,
    },
  })
}

export const fetchChangePassword = (
  currentPassword: string,
  newPassword: string,
) => {
  return authCloudRequest({
    url: "/users/password",
    method: "PATCH",
    data: {
      currentPassword,
      newPassword,
    },
  })
}
