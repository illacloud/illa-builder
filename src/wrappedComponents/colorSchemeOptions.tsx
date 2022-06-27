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
  { key: globalColor(`--${illaPrefix}-blue-01`), value: "blue" },
  { key: globalColor(`--${illaPrefix}-white-01`), value: "white" },
  { key: globalColor(`--${illaPrefix}-red-01`), value: "red" },
  { key: globalColor(`--${illaPrefix}-green-01`), value: "green" },
  {
    key: globalColor(`--${illaPrefix}-yellow-01`),
    value: "yellow",
  },
  {
    key: globalColor(`--${illaPrefix}-orange-01`),
    value: "orange",
  },
  {
    key: globalColor(`--${illaPrefix}-purple-01`),
    value: "purple",
  },
  { key: globalColor(`--${illaPrefix}-cyan-01`), value: "cyan" },
  { key: globalColor(`--${illaPrefix}-gray-01`), value: "gray" },
  { key: globalColor(`--${illaPrefix}-grayBlue-01`), value: "grayBlue" },
]
