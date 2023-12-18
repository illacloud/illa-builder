export const getSafeNode = (value: unknown) => {
  if (typeof value === "string" || typeof value === "number") {
    return `${value}`
  }
  return ""
}
