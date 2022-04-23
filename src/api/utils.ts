export function parseObjectToQueryParams(object?: object) {
  if (typeof object === "undefined" || object === null) {
    return ""
  }

  const params = Object.entries(object).map(
    ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
  )

  return `?${params.join("&")}`
}
