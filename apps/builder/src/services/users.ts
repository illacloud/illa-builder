import { authCloudRequest } from "@illa-public/illa-net"
import { CurrentUser, currentUserActions } from "@illa-public/user-data"
import { isCloudVersion } from "@illa-public/utils"
import { v4 } from "uuid"
import { fetchSendEmail } from "@/services/auth"
import { upload } from "@/utils/file/upload"
import { ILLABuilderStorage } from "@/utils/storage"
import store from "../store"

export const fetchUserInfo = () => {
  return authCloudRequest<CurrentUser>({
    url: "/users",
  })
}

export const fetchUserAvatarUploadAddress = (
  fileName: string,
  type: string,
) => {
  return authCloudRequest<UploadResponse>({
    url: `/users/avatar/uploadAddress/fileName/${fileName}.${type}`,
    method: "GET",
  })
}

export interface UploadResponse {
  uploadAddress: string
}

export const uploadUserAvatar = async (file: Blob) => {
  const type = file.type.split("/")[1]
  const uploadUrl = await getUserAvatarUploadAddress(type)
  if (uploadUrl) {
    return await upload(uploadUrl.uploadAddress, file)
  }
  return Promise.reject("uploadUrl is undefined")
}

export const getUserAvatarUploadAddress = async (type: string) => {
  const fileName = v4()
  const { data } = await fetchUserAvatarUploadAddress(fileName, type)
  if (data) {
    if (!isCloudVersion) {
      data.uploadAddress = data.uploadAddress
      return data
    }
    return data
  }
  return Promise.reject("data is undefined")
}

export const updateUserAvatar = async (avatar: string) => {
  await authCloudRequest({
    url: "/users/avatar",
    method: "PATCH",
    data: {
      avatar,
    },
  })
  return true
}

export const sendEmail = async (
  email: string,
  usage: "signup" | "forgetpwd",
) => {
  const requestData = {
    email,
    usage,
  }
  const res = await fetchSendEmail(requestData)
  const verificationToken = res?.data?.verificationToken
  ILLABuilderStorage.setSessionStorage("verificationToken", verificationToken)
  return verificationToken
}

export const updateTutorialViewed = async (isTutorialViewed: boolean) => {
  await authCloudRequest({
    url: "/users/tutorialViewed",
    method: "PATCH",
    data: {
      isTutorialViewed,
    },
  })
  store.dispatch(currentUserActions.updateUserIsTutorialViewedReducer(true))
}
