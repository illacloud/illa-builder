import { Params } from "./interface"

export function concatParam(params: Params[]): string {
  return params
    ?.filter(({ key, value }) => key !== "" && value !== undefined)
    .map(({ key, value }) => `${key}=${value}`)
    .join("&")
}

export function extractPath(path: string): string {
  if (path === "") {
    return ""
  }

  return path.indexOf("?") === -1
    ? path.slice(0)
    : path.slice(0, path.indexOf("?"))
}

export function hasParamInPath(path?: string): boolean {
  if (!path) {
    return false
  }

  return path.split("?").length > 1
}

export function extractParamFromPath(path?: string): Params[] {
  if (!path) {
    return []
  }

  const firstQuestionMarkIndex = path?.indexOf("?")

  if (firstQuestionMarkIndex === -1) {
    return []
  }

  const urlParamsStr = path?.slice((firstQuestionMarkIndex ?? -1) + 1)

  return (
    urlParamsStr?.split("&").map((param) => {
      const equalMarkIndex = param.indexOf("=")
      let key = "", value = ""

      if (equalMarkIndex !== -1) {
        key = param.slice(0, equalMarkIndex)
        value = param.slice(equalMarkIndex + 1)
      } else {
        key = param
      }
      return { key, value }
    }) ?? []
  )
}
