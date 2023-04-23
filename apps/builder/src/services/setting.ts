import { cloudRequest } from "@/api/http"
import {
  CurrentUser,
  UserInfoResponse,
} from "@/redux/currentUser/currentUserState"

export const fetchChangeNickname = (nickname: string) => {
  return cloudRequest<UserInfoResponse>({
    url: "/users/nickname",
    method: "PATCH",
    data: {
      nickname,
    },
  })
}

export const fetchChangeLanguage = (language: string) => {
  return cloudRequest<CurrentUser>({
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
  return cloudRequest({
    url: "/users/password",
    method: "PATCH",
    data: {
      currentPassword,
      newPassword,
    },
  })
}
