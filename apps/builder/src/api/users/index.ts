import { v4 } from "uuid"
import { Api } from "@/api/base"
import { CloudApi } from "@/api/cloudApi"
import { ILLABuilderStorage } from "@/utils/storage"
import { isCloudVersion } from "@/utils/typeHelper"

export interface UploadResponse {
  uploadAddress: string
}

export const upload = async (url: string, file: Blob) => {
  const resUrl = url.split("?")[0]

  await Api.asyncRequest({
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

export const getUserAvatarUploadAddress = async (type: string) => {
  const fileName = v4()
  const { data } = await CloudApi.asyncRequest<UploadResponse>({
    url: `/users/avatar/uploadAddress/fileName/${fileName}.${type}`,
    method: "GET",
  })
  if (data) {
    if (!isCloudVersion) {
      data.uploadAddress = `${window.location.origin}${data.uploadAddress}`
      return data
    }
    return data
  }
  return Promise.reject("data is undefined")
}

export const uploadUserAvatar = async (file: Blob) => {
  const type = file.type.split("/")[1]
  const uploadUrl = await getUserAvatarUploadAddress(type)
  if (uploadUrl) {
    return await upload(uploadUrl.uploadAddress, file)
  }
  return Promise.reject("uploadUrl is undefined")
}

export const updateUserAvatar = async (avatar: string) => {
  await CloudApi.asyncRequest({
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
  const res = await CloudApi.asyncRequest<{ verificationToken: string }>({
    method: "POST",
    url: "/auth/verification",
    data: {
      email,
      usage,
    },
  })
  const verificationToken = res?.data?.verificationToken
  ILLABuilderStorage.setSessionStorage("verificationToken", verificationToken)
  return verificationToken
}
