import { getSpecialThemeColor } from "@illa-design/react"

export const colorSchemes = [
  "white",
  "grayBlue",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "cyan",
  "purple",
]

// for old app
export const deletedColorSchemes = ["transparent", "blackAlpha"]

export const COLOR_MAP = (() => {
  const m = new Map<string, string>()
  colorSchemes.forEach((color) => {
    m.set(getSpecialThemeColor(color), color)
  })
  return m
})()

export const PRE_COLOR = colorSchemes.map((color) => {
  return {
    title: color,
    color: getSpecialThemeColor(color),
  }
})
