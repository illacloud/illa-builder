import { globalColor, illaPrefix } from "@illa-design/theme"

export const colorSchemes = [
  "blue",
  "white",
  "gray",
  "red",
  "green",
  "yellow",
  "orange",
  "cyan",
  "purple",
]

export const colorSchemeOptions = [
  { key: globalColor(`--${illaPrefix}-blue-03`), value: "blue" },
  { key: globalColor(`--${illaPrefix}-white-01`), value: "white" },
  { key: globalColor(`--${illaPrefix}-red-03`), value: "red" },
  { key: globalColor(`--${illaPrefix}-green-03`), value: "green" },
  {
    key: globalColor(`--${illaPrefix}-yellow-03`),
    value: "yellow",
  },
  {
    key: globalColor(`--${illaPrefix}-orange-03`),
    value: "orange",
  },
  {
    key: globalColor(`--${illaPrefix}-purple-01`),
    value: "purple",
  },
  { key: globalColor(`--${illaPrefix}-cyan-03`), value: "cyan" },
  { key: globalColor(`--${illaPrefix}-gray-03`), value: "gray" },
  { key: globalColor(`--${illaPrefix}-grayBlue-03`), value: "grayBlue" },
]
