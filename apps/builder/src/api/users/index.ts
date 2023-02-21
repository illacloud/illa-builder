import axios from "axios"
import { v4 } from "uuid"
import { CloudApi } from "@/api/cloudApi"
import { isCloudVersion } from "@/utils/typeHelper"

export interface UploadResponse {
  uploadAddress: string
}

export const upload = async (url: string, file: Blob) => {
  const resUrl = url.split("?")[0]

  await axios.put(url, file, {
    headers: {
      "Content-Type": "multipart/form-data",
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
  if (data) return data
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
