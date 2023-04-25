import { v4 } from "uuid"
import { basicRequest, cloudRequest } from "@/api/http"
import { currentUserActions } from "@/redux/currentUser/currentUserSlice"
import { fetchSendEmail } from "@/services/auth"
import { ILLABuilderStorage } from "@/utils/storage"
import { isCloudVersion } from "@/utils/typeHelper"
import store from "../store"

interface IUserInfoResponse {
  avatar: string
  createdAt: string
  email: string
  isPasswordSetted: boolean
  isTutorialViewed: boolean
  language: string
  nickname: string
  ssoVerified: {
    github: boolean
    google: boolean
  }
  uid: string
  updatedAt: string
  userID: string
}
export const fetchUserInfo = () => {
  return cloudRequest<IUserInfoResponse>({
    url: "/users",
  })
}

export const fetchUserAvatarUploadAddress = (
  fileName: string,
  type: string,
) => {
  return cloudRequest<UploadResponse>({
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

export const upload = async (url: string, file: Blob) => {
  const resUrl = url.split("?")[0]
  await basicRequest({
    url,
    method: "PUT",
    data: file,
    headers: {
      "Content-Type": "multipart/form-data",
      "Content-Encoding": "compress",
      "x-amz-acl": "public-read",
    },
  })
  return resUrl
}

export const updateUserAvatar = async (avatar: string) => {
  await cloudRequest({
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
  await cloudRequest({
    url: "/users/tutorialViewed",
    method: "PATCH",
    data: {
      isTutorialViewed,
    },
  })
  store.dispatch(currentUserActions.updateUserIsTutorialViewedReducer(true))
}
