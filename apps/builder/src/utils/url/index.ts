export const filterURLSearch = (
  search: string[],
  path = window.location.href,
) => {
  const urlObj = new URL(path)
  const newSearch = new URLSearchParams()
  search.forEach((param) => {
    const value = urlObj.searchParams.get(param)
    value && newSearch.set(param, value)
  })
  const searchParams = newSearch.toString()
  return searchParams ? `?${searchParams}` : searchParams
}

export const removeUrlParams = (url: string, params: string[]) => {
  const urlObj = new URL(url)
  params.forEach((param) => {
    urlObj.searchParams.delete(param)
  })
  return urlObj
}

export const isUrl = (str: string) => {
  const pattern = new RegExp(
    "^((blob:)?https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i",
  ) // fragment locator
  return pattern.test(str)
}
