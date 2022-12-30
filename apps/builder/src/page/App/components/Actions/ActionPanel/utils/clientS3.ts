import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3"
import { S3ActionRequestType } from "@/redux/currentApp/action/s3Action"
import { Resource, ResourceContent } from "@/redux/resource/resourceState"
import { S3Resource } from "@/redux/resource/s3Resource"

export const ClientS3 = [
  S3ActionRequestType.READ_ONE,
  S3ActionRequestType.DOWNLOAD_ONE,
  S3ActionRequestType.UPLOAD,
  S3ActionRequestType.UPLOAD_MULTIPLE,
]

export const s3ClientInitialMap = new Map()

export const downloadActionResult = (
  contentType: string,
  fileName: string,
  data: string,
) => {
  const isBase64 = isValidBase64(data)
  let href = ""
  if (!isBase64) {
    let blob = new Blob([data], { type: contentType })
    href = URL.createObjectURL(blob)
  }
  const a = document.createElement("a")
  a.download = fileName
  a.style.display = "none"
  a.href = isBase64 ? `data:${contentType};base64,${data}` : href
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export const isValidBase64 = (str: string) => {
  try {
    window.atob(str)
    return true
  } catch (e) {
    return false
  }
}

export function base64ToArrayBuffer(base64: string) {
  let binary_string = window.atob(base64)
  let len = binary_string.length
  let bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i)
  }
  return bytes
}

const fromCharCode = String.fromCharCode
export const encodeToBase64 = (uint8array: Uint8Array) => {
  const output = []
  for (let i = 0, length = uint8array.length; i < length; i++) {
    output.push(fromCharCode(uint8array[i]))
  }
  return btoa(output.join(""))
}

export const initS3Client = (resourceList: Resource<ResourceContent>[]) => {
  resourceList.forEach((resource) => {
    if (resource.resourceType === "s3") {
      const content = resource.content
      const { accessKeyID, secretAccessKey, region, bucketName } =
        content as S3Resource
      const s3Client = new S3Client({
        region,
        credentials: {
          accessKeyId: accessKeyID,
          secretAccessKey,
        },
      })
      const operations = {
        getObject(key: string) {
          return s3Client.send(
            new GetObjectCommand({
              Bucket: bucketName,
              Key: key,
            }),
          )
        },
        putObject(key: string, body: string, contentType?: string) {
          return s3Client.send(
            new PutObjectCommand({
              Bucket: bucketName,
              Key: key,
              Body: isValidBase64(body) ? base64ToArrayBuffer(body) : body,
              ...(contentType && {
                ContentType: contentType,
              }),
            }),
          )
        },
      }
      s3ClientInitialMap.set(resource.resourceId, operations)
    }
  })
}
