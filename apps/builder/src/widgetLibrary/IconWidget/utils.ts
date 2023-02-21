import * as RiLib from "react-icons"
import * as ai from "react-icons/ai"
import * as bi from "react-icons/bi"
import * as bs from "react-icons/bs"
import * as tb from "react-icons/tb"
import { RIALL } from "./interface"

export const ALL_ICONS = (RiLib as unknown as RIALL)["IconsManifest"]

export const AllIconData: Record<string, Record<string, RiLib.IconType>> = {
  ai,
  bi,
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
