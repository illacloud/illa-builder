import * as RiLib from "react-icons"
import * as ai from "react-icons/ai"
import * as bi from "react-icons/bi"
import * as bs from "react-icons/bs"
import * as cg from "react-icons/cg"
import * as ci from "react-icons/ci"
import * as di from "react-icons/di"
import * as fa from "react-icons/fa"
import * as fc from "react-icons/fc"
import * as fi from "react-icons/fi"
import * as gi from "react-icons/gi"
import * as go from "react-icons/go"
import * as gr from "react-icons/gr"
import * as hi from "react-icons/hi"
import * as hi2 from "react-icons/hi2"
import * as im from "react-icons/im"
import * as io from "react-icons/io"
import * as io5 from "react-icons/io5"
import * as md from "react-icons/md"
import * as ri from "react-icons/ri"
import * as rx from "react-icons/rx"
import * as si from "react-icons/si"
import * as sl from "react-icons/sl"
import * as tb from "react-icons/tb"
import * as tfi from "react-icons/tfi"
import * as ti from "react-icons/ti"
import * as vsc from "react-icons/vsc"
import * as wi from "react-icons/wi"
import { RIALL } from "./interface"

export const ALL_ICONS = (RiLib as unknown as RIALL)["IconsManifest"]

export const AllIconData: Record<string, Record<string, RiLib.IconType>> = {
  ai,
  bi,
  bs,
  cg,
  ci,
  di,
  fa,
  fc,
  fi,
  gi,
  go,
  gr,
  hi,
  hi2,
  im,
  io,
  io5,
  md,
  ri,
  rx,
  si,
  sl,
  tb,
  tfi,
  ti,
  vsc,
  wi,
}

export const AllData: Record<string, RiLib.IconType> = Object.keys(
  AllIconData,
).reduce((result, key) => {
  const data = AllIconData[key]
  result = { ...result, ...data }
  return result
}, {})
