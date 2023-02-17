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
