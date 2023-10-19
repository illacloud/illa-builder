import {
  authCloudRequest,
  notNeedAuthCloudRequest,
} from "@illa-public/illa-net"
import { v4 } from "uuid"
import { upload } from "@/api/custom"
import { ILLACloudStorage } from "@/utils/storage"

export interface UploadResponse {
  uploadAddress: string
}

export const fetchSendVerificationCodeToEmail = async (
  email: string,
  usage: "signup" | "forgetpwd",
) => {
  try {
    const res = await notNeedAuthCloudRequest<{ verificationToken: string }>({
      method: "POST",
      url: "/auth/verification",
      data: {
        email,
        usage,
      },
    })

    const verificationToken = res?.data?.verificationToken
    ILLACloudStorage.setSessionStorage("verificationToken", verificationToken)
    return verificationToken
  } catch (e) {
    throw e
  }
}

export const getUserAvatarUploadAddress = async (type: string) => {
  const fileName = v4()
  try {
    const response = await authCloudRequest<UploadResponse>({
      url: `/users/avatar/uploadAddress/fileName/${fileName}.${type}`,
      method: "GET",
    })
    return response.data
  } catch (e) {
    throw e
  }
}

export const uploadUserAvatar = (file: Blob) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const type = file.type.split("/")[1]
      const uploadUrl = await getUserAvatarUploadAddress(type)
      if (uploadUrl) {
        const imgUrl = await upload(uploadUrl.uploadAddress, file)
        resolve(imgUrl)
      }
    } catch (e) {
      reject(e)
    }
  })
}

export const updateUserAvatar = async (avatar: string) => {
  try {
    return await authCloudRequest({
      url: "/users/avatar",
      method: "PATCH",
      data: {
        avatar,
      },
    })
  } catch (e) {
    throw e
  }
}
