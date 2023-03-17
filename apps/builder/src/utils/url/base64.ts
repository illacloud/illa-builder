const base64Regex =
  /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/

const mimeRegex = /^data:\w+\/[a-zA-Z+\-.]+;base64,/

export const isBase64 = (v: string, mimeRequired?: boolean) => {
  const value = v.split(",")
  if (!base64Regex.test(value[1])) {
    return false
  }
  if (mimeRequired) {
    return mimeRegex.test(value[0] + ",")
  }
  return true
}

export const isBase64Prefix = (v: string) => {
  return mimeRegex.test(v)
}
