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
