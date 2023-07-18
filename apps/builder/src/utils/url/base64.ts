const mimeRegex = /^data:\w+\/[a-zA-Z+\-.]+;base64,/

function isValidBase64(src: string) {
  // according file size to use different regex
  const fileSize = src.length

  let regex
  if (fileSize > 1024 * 1024) {
    regex = /^[A-Za-z0-9+/]+=*$/
  } else {
    regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
  }
  return regex.test(src)
}

export const isBase64 = (v: string, mimeRequired?: boolean) => {
  if (typeof v !== "string") return false
  const value = v.split(",")
  const prefix = value.length > 1 ? value[0] : ""
  const suffix = value.length > 1 ? value[1] : value[0]
  if (value.length > 2) {
    return false
  }
  if (!isValidBase64(suffix)) {
    return false
  }
  if (mimeRequired) {
    return mimeRegex.test(prefix + ",")
  }
  return true
}

export const isBase64Simple = (str: string) => {
  if (typeof str !== "string") return
  if (str.indexOf("data:") != -1 && str.indexOf("base64") != -1) {
    return true
  } else {
    return false
  }
}
