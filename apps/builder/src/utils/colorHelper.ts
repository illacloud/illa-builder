import { hsv } from "chroma-js"
import { hash } from "fnv-plus"

export const colorRadom: string[] = []
for (let i = 1; i <= 18; i++) {
  const item = i * 20
  colorRadom.push(hsv(item, 0.75, item >= 60 && item <= 180 ? 0.9 : 1).hex())
}

export const getAllColorRange = () => {
  const colorRadom: string[] = []
  for (let i = 1; i <= 18; i++) {
    const item = i * 20
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
  const hash64 = hash(str, 64)
  const dec = hash64.dec()
  return parseInt(dec)
}
