import {
  HTTP_REQUEST_PUBLIC_BASE_URL,
  PUBLIC_DRIVE_REQUEST_PREFIX,
} from "@illa-public/illa-net"

export const isDriveURL = (url: string) => {
  let prefix = HTTP_REQUEST_PUBLIC_BASE_URL + PUBLIC_DRIVE_REQUEST_PREFIX
  return url.includes(prefix)
}
