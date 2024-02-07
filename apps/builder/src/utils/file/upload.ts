import Axios from "axios"

export const upload = async (url: string, file: Blob) => {
  const resUrl = url.split("?")[0]
  await Axios.put(url, file, {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-amz-acl": "public-read",
    },
  })
  return resUrl
}
