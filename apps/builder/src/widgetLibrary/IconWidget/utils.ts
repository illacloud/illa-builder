import * as RiLib from "react-icons/"
import * as bs from "react-icons/bs"
import * as fc from "react-icons/fc"
import * as sl from "react-icons/sl"
import * as tb from "react-icons/tb"
import { RIALL } from "./interface"

const IMPORT_ICONS_ID = ["sl", "fc", "bs", "tb"]
export const ALL_ICONS = (RiLib as unknown as RIALL)["IconsManifest"].filter(
  (iconManifest) => {
    return IMPORT_ICONS_ID.includes(iconManifest.id)
  },
)
export const AllIconData: Record<string, Record<string, RiLib.IconType>> = {
  sl,
  fc,
  bs,
  tb,
}

export const AllData: Record<string, RiLib.IconType> = Object.keys(
  AllIconData,
).reduce((result, key) => {
  const data = AllIconData[key]
  result = { ...result, ...data }
  return result
}, {})
