import Axios from "axios"

export const upload = (url: string, file: Blob) => {
  const resUrl = url.split("?")[0]

  return new Promise<string>(async (resolve, reject) => {
    try {
      await Axios.put(url, file, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-amz-acl": "public-read",
        },
      })
      resolve(resUrl)
    } catch (e) {
      reject(e)
    }
  })
}
