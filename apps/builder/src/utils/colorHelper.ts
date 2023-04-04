import { hsv } from "chroma-js"
import { hash } from "fnv-plus"

export const getAllColorRange = () => {
  const colorRadom: string[] = []
  for (let i = 1; i <= 18; i++) {
    const item = i * 20
    if (item === 240 || item === 260) continue
    colorRadom.push(hsv(item, 0.75, item >= 60 && item <= 180 ? 0.9 : 1).hex())
  }
  return colorRadom
}

export const getColorByIndex = (index: number) => {
  const colorRadom = getAllColorRange()
  return colorRadom[index % colorRadom.length]
}

export const getColorIndexByString = (str: string) => {
  if (!str) return 0
  const hash64 = hash(str, 16)
  const dec = hash64.dec()
  return parseInt(dec)
}

export const getColorByString = (str: string) => {
  const index = getColorIndexByString(str)
  return getColorByIndex(index)
}
