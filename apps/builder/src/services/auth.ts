import { cloudRequest } from "@/api/http"
import { RegisterResult } from "@/page/User/Register/interface"
import { ResetPwdFields } from "@/page/User/ResetPassword/interface"
import { UserInfoResponse } from "@/redux/currentUser/currentUserState"

export const fetchSignIn = async (data: unknown) => {
  return cloudRequest<UserInfoResponse>({
    method: "POST",
    url: "/auth/signin",
    data,
  })
}

export const fetchSignUp = async (data: unknown) => {
  return cloudRequest<RegisterResult>({
    method: "POST",
    url: "/auth/signup",
    data,
  })
}

export const fetchLogout = async () => {
  return cloudRequest<RegisterResult>({
    method: "POST",
    url: "/users/logout",
  })
}

interface ISendEmail {
  email: string
  usage: "signup" | "forgetpwd"
}
export const fetchSendEmail = async (data: ISendEmail) => {
  return await cloudRequest<{ verificationToken: string }>({
    method: "POST",
    url: "/auth/verification",
    data,
  })
}

interface IFetchUpdatePassword extends ResetPwdFields {
  verificationToken: string
}

export const fetchUpdatePassword = async (data: IFetchUpdatePassword) => {
  return cloudRequest({
    method: "POST",
    url: "/auth/forgetPassword",
    data,
  })
}
