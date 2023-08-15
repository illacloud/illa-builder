import { notNeedAuthRequest } from "@illa-public/illa-net"

export const upload = async (url: string, file: Blob) => {
  const resUrl = url.split("?")[0]
  await notNeedAuthRequest({
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
