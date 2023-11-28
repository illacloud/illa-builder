import {
  authCloudRequest,
  notNeedAuthCloudRequest,
} from "@illa-public/illa-net"
import { CurrentUserInfo } from "@illa-public/public-types"

interface SignInRequestBody {
  email: string
  password: string
}
export const fetchSignIn = (data?: SignInRequestBody) => {
  return notNeedAuthCloudRequest<CurrentUserInfo>({
    url: "/auth/signin",
    method: "POST",
    data,
  })
}

interface forgetPasswordRequestBody {
  email: string
  verificationToken: string
  newPassword: string
}

export const fetchUpdatePasswordFromForgot = (
  data: forgetPasswordRequestBody,
) => {
  return authCloudRequest({
    method: "POST",
    url: "/auth/forgetPassword",
    data,
  })
}

interface IFetchSignInRequestData {
  nickname: string
  email: string
  verificationToken: string
  password: string
  isSubscribed: boolean
  inviteToken?: string | null
  language: string
}

export const fetchSignUp = (data: IFetchSignInRequestData) => {
  return authCloudRequest<CurrentUserInfo>({
    method: "POST",
    url: "/auth/signup",
    data: data,
  })
}

export const fetchLogout = async (token: string) => {
  return await authCloudRequest({
    method: "POST",
    url: "/users/logout",
    headers: {
      Authorization: token,
    },
  })
}
