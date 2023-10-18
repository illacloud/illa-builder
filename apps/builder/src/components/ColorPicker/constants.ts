import { getColor } from "@illa-design/react"

export const colorSchemes = [
  "white",
  "blackAlpha",
  "grayBlue",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "cyan",
  "purple",
  "transparent",
]

export const COLOR_MAP = (() => {
  const m = new Map<string, string>()
  colorSchemes.forEach((color) => {
    m.set(getColor(color, "03"), color)
  })
  return m
})()

export const PRE_COLOR = colorSchemes.map((color) => {
  return {
    title: color,
    color: getColor(color, "03"),
  }
})
