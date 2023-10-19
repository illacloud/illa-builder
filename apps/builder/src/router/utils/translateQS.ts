import { needSavedSearchParams } from "../constant"

export const getQS = (searchParams: URLSearchParams) => {
  const qs = searchParams.toString()
  return qs ? `?${qs}` : ""
}

export const removeIgnoredQS = (searchParams: URLSearchParams) => {
  needSavedSearchParams.forEach((key) => {
    searchParams.delete(key)
  })
  return getQS(searchParams)
}
