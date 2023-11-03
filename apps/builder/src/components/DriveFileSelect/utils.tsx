export const getCurrentPath = (limitPath: string, totalPath?: string) => {
  const curTotalPath = totalPath ?? limitPath
  const limitPathArr = limitPath.split("/")
  const limitRoot = limitPathArr[limitPathArr.length - 1]
  return removeSuffixPath(`${limitRoot}${curTotalPath.replace(limitPath, "")}`)
}

export const removeSuffixPath = (path: string): string => {
  const regex = /^\/?(.*?)\/?$/
  return path?.match(regex)?.[1] || path
}
