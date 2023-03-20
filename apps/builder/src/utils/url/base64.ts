const mimeRegex = /^data:\w+\/[a-zA-Z+\-.]+;base64,/

const isValid = (src: string) => {
  var s = src.replace(/\s+/g, "").replace(/={0,2}$/, "")
  return !/[^\s0-9a-zA-Z\+/]/.test(s) || !/[^\s0-9a-zA-Z\-_]/.test(s)
}

export const isBase64 = (v: string, mimeRequired?: boolean) => {
  const value = v.split(",")
  const prefix = value.length > 1 ? value[0] : ""
  const suffix = value.length > 1 ? value[1] : value[0]
  if (value.length > 2) {
    return false
  }
  if (!isValid(suffix)) {
    return false
  }
  if (mimeRequired) {
    return mimeRegex.test(prefix + ",")
  }
  return true
}

export const isBase64Prefix = (v: string) => {
  return mimeRegex.test(v)
}
