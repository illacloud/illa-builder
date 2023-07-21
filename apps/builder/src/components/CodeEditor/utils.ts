export const fixedValue = (value: unknown) => {
  if (value == undefined) return ""
  if (typeof value === "string") return value
  return `{{${JSON.stringify(value)}}}`
}
