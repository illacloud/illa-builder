import { authCloudRequest } from "@illa-public/illa-net"
import { v4 } from "uuid"
import { upload } from "@/api/custom"

export interface UploadResponse {
  uploadAddress: string
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
