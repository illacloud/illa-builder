import { isObject, isString } from "lodash-es"
import { isNumber } from "@illa-design/react"
import { JSToString, stringToJS } from "@/utils/evaluateDynamicString/utils"
import { UNIQUE_ID_NAME } from "@/widgetLibrary/DataGridWidget/constants"

export function dealRawData2ArrayData(
  rawData: unknown,
  enableServerSidePagination?: boolean,
  serverSideOffset?: number,
): object[] {
  if (rawData === undefined || rawData === "" || rawData === null) {
    return []
  }
  if (Array.isArray(rawData)) {
    if (rawData.length === 0) {
      return []
    } else {
      if (isObject(rawData[0])) {
        return rawData.map((item, i) => {
          let uniqueID = i
          if (enableServerSidePagination && serverSideOffset) {
            uniqueID = serverSideOffset + i
          }
          return {
            [UNIQUE_ID_NAME]: uniqueID,
            ...item,
          }
        })
      } else {
        return rawData.map((item, i) => {
          let uniqueID = i
          if (enableServerSidePagination && serverSideOffset) {
            uniqueID = serverSideOffset + i
          }
          return {
            [UNIQUE_ID_NAME]: uniqueID,
            field: item,
          }
        })
      }
    }
  } else {
    let uniqueID = 0
    if (enableServerSidePagination && serverSideOffset) {
      uniqueID = serverSideOffset
    }
    if (isObject(rawData)) {
      return [
        {
          [UNIQUE_ID_NAME]: uniqueID,
          ...rawData,
        },
      ]
    } else {
      return [
        {
          [UNIQUE_ID_NAME]: uniqueID,
          field: rawData,
        },
      ]
    }
  }
}

export function getHashCode(str: string) {
  let hash = 0,
    i,
    chr
  if (typeof str !== "string" || str.length === 0) return hash
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}

export function isValidLocale(locale: string) {
  const localePattern = /^[a-z]{2}(?:-[A-Z]{2})?$/
  return localePattern.test(locale)
}

export const CurrencyCode = {
  AED: "د.إ",
  AFN: "؋",
  ALL: "L",
  AMD: "֏",
  ANG: "ƒ",
  AOA: "Kz",
  ARS: "$",
  AUD: "$",
  AWG: "ƒ",
  AZN: "₼",
  BAM: "KM",
  BBD: "$",
  BDT: "৳",
  BGN: "лв",
  BHD: ".د.ب",
  BIF: "FBu",
  BMD: "$",
  BND: "$",
  BOB: "$b",
  BRL: "R$",
  BSD: "$",
  BTC: "₿",
  BTN: "Nu.",
  BWP: "P",
  BYR: "Br",
  BYN: "Br",
  BZD: "BZ$",
  CAD: "$",
  CDF: "FC",
  CHF: "CHF",
  CLP: "$",
  CNY: "¥",
  COP: "$",
  CRC: "₡",
  CUC: "$",
  CUP: "₱",
  CVE: "$",
  CZK: "Kč",
  DJF: "Fdj",
  DKK: "kr",
  DOP: "RD$",
  DZD: "دج",
  EEK: "kr",
  EGP: "£",
  ERN: "Nfk",
  ETB: "Br",
  ETH: "Ξ",
  EUR: "€",
  FJD: "$",
  FKP: "£",
  GBP: "£",
  GEL: "₾",
  GGP: "£",
  GHC: "₵",
  GHS: "GH₵",
  GIP: "£",
  GMD: "D",
  GNF: "FG",
  GTQ: "Q",
  GYD: "$",
  HKD: "$",
  HNL: "L",
  HRK: "kn",
  HTG: "G",
  HUF: "Ft",
  IDR: "Rp",
  ILS: "₪",
  IMP: "£",
  INR: "₹",
  IQD: "ع.د",
  IRR: "﷼",
  ISK: "kr",
  JEP: "£",
  JMD: "J$",
  JOD: "JD",
  JPY: "¥",
  KES: "KSh",
  KGS: "лв",
  KHR: "៛",
  KMF: "CF",
  KPW: "₩",
  KRW: "₩",
  KWD: "KD",
  KYD: "$",
  KZT: "лв",
  LAK: "₭",
  LBP: "£",
  LKR: "₨",
  LRD: "$",
  LSL: "M",
  LTC: "Ł",
  LTL: "Lt",
  LVL: "Ls",
  LYD: "LD",
  MAD: "MAD",
  MDL: "lei",
  MGA: "Ar",
  MKD: "ден",
  MMK: "K",
  MNT: "₮",
  MOP: "MOP$",
  MRO: "UM",
  MRU: "UM",
  MUR: "₨",
  MVR: "Rf",
  MWK: "MK",
  MXN: "$",
  MYR: "RM",
  MZN: "MT",
  NAD: "$",
  NGN: "₦",
  NIO: "C$",
  NOK: "kr",
  NPR: "₨",
  NZD: "$",
  OMR: "﷼",
  PAB: "B/.",
  PEN: "S/",
  PGK: "K",
  PHP: "₱",
  PKR: "₨",
  PLN: "zł",
  PYG: "Gs",
  QAR: "﷼",
  RMB: "￥",
  RON: "lei",
  RSD: "Дин.",
  RUB: "₽",
  RWF: "R₣",
  SAR: "﷼",
  SBD: "$",
  SCR: "₨",
  SDG: "ج.س.",
  SEK: "kr",
  SGD: "S$",
  SHP: "£",
  SLL: "Le",
  SOS: "S",
  SRD: "$",
  SSP: "£",
  STD: "Db",
  STN: "Db",
  SVC: "$",
  SYP: "£",
  SZL: "E",
  THB: "฿",
  TJS: "SM",
  TMT: "T",
  TND: "د.ت",
  TOP: "T$",
  TRL: "₤",
  TRY: "₺",
  TTD: "TT$",
  TVD: "$",
  TWD: "NT$",
  TZS: "TSh",
  UAH: "₴",
  UGX: "USh",
  USD: "$",
  UYU: "$U",
  UZS: "so'm",
  VEF: "Bs",
  VND: "₫",
  VUV: "VT",
  WST: "WS$",
  XAF: "FCFA",
  XBT: "Ƀ",
  XCD: "$",
  XOF: "CFA",
  XPF: "₣",
  YER: "﷼",
  ZAR: "R",
  ZMK: "ZK",
  ZWD: "Z$",
}

export function getPreColor(index: number) {
  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "cyan",
    "purple",
    "techPink",
  ]
  return colors[Math.abs(index) % colors.length]
}

export const realInputValueWithDataList = (
  attrValue: string | undefined,
  widgetDisplayName: string,
) => {
  if (attrValue === "" || attrValue == undefined) return undefined
  let value = attrValue
  if (
    attrValue.includes(
      `{{${widgetDisplayName}.dataSource.map((currentRow) => (`,
    )
  ) {
    value = `${attrValue.substring(
      `{{${widgetDisplayName}.dataSource.map((currentRow) => (`.length,
      attrValue.length - 4,
    )}`
    return JSToString(value)
  } else if (
    attrValue.includes(
      `{{${widgetDisplayName}.dataSourceJS.map((currentRow) => (`,
    )
  ) {
    value = `${attrValue.substring(
      `{{${widgetDisplayName}.dataSourceJS.map((currentRow) => (`.length,
      attrValue.length - 4,
    )}`
    return JSToString(value)
  }
  return value
}

export const getNeedComputedValueWithDataList = (
  value: string,
  widgetDisplayName: string,
  dataSourceMode: "dynamic" | "select",
) => {
  const stringToCanEvaluate = stringToJS(value)
  if (stringToCanEvaluate === "") {
    return stringToCanEvaluate
  }
  return `{{${widgetDisplayName}.${
    dataSourceMode === "select" ? "dataSource" : "dataSourceJS"
  }.map((currentRow) => (${stringToCanEvaluate}))}}`
}

export const getValueFromMappedValue = (
  value: unknown,
  index: number,
  defaultValue?: string,
): string | undefined => {
  let finalValue = defaultValue
  if (Array.isArray(value)) {
    finalValue = isString(value[index]) ? value[index] : finalValue
  } else if (isNumber(value) || isString(value)) {
    finalValue = `${value}`
  }
  return finalValue
}
