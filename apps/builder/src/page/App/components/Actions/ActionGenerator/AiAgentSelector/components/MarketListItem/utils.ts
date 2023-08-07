export const formatNumForAgent = (num: number) => {
  if (typeof num !== "number") return "0"
  if (num < 100) return `${num}`
  if (num < 1000) return `${(num / 1000).toFixed(1)}k`
  return `${(num / 1000).toFixed(1)}k`
}
