import { AxiosResponse } from "axios"
import { isString } from "@illa-design/react"
import { ILLAApiError } from "@/api/http"

const DISPLAY_NAME_REGEX = /^([a-zA-Z_$])([a-zA-Z0-9_$])*$/

export enum Types {
  STRING = "STRING",
  NUMBER = "NUMBER",
  BOOLEAN = "BOOLEAN",
  OBJECT = "OBJECT",
  ARRAY = "ARRAY",
  FUNCTION = "FUNCTION",
  UNDEFINED = "UNDEFINED",
  NULL = "NULL",
  UNKNOWN = "UNKNOWN",
}

export const isObject = (value: unknown): boolean => {
  return Object.prototype.toString.call(value) === "[object Object]"
}

export const isFunction = (value: unknown): boolean => {
  return Object.prototype.toString.call(value) === "[object Function]"
}

export const getType = (value: unknown) => {
  if (typeof value === "string") return Types.STRING
  if (typeof value === "number") return Types.NUMBER
  if (typeof value === "boolean") return Types.BOOLEAN
  if (Array.isArray(value)) return Types.ARRAY
  if (isFunction(value)) return Types.FUNCTION
  if (isObject(value)) return Types.OBJECT
  if (typeof value === "undefined") return Types.UNDEFINED
  if (value === null) return Types.NULL
  return Types.UNKNOWN
}

export function isURL(str: string) {
  const pattern = new RegExp(
    /^(((ht|f)tps?):\/\/)?(([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})\/?/,
  ) // fragment locator
  return !!pattern.test(str)
}

export function isBlobURLOrUrl(url: string): boolean {
  if (!url) return false
  return url.startsWith("blob:") || isURL(url)
}

export const isValidUrlScheme = (url: string): boolean => {
  return (
    // Standard http call
    url.startsWith("http://") ||
    // Secure http call
    url.startsWith("https://") ||
    // Mail url to directly open email app prefilled
    url.startsWith("mailto:") ||
    // Tel url to directly open phone app prefilled
    url.startsWith("tel:")
  )
}

export const isInt = (val: string | number): boolean => {
  return Number.isInteger(val) || (isString(val) && /^\d+$/.test(val))
}

export const isValidDisplayName = (displayName: string): boolean =>
  DISPLAY_NAME_REGEX.test(displayName)

export const isCloudVersion = import.meta.env.VITE_INSTANCE_ID === "CLOUD"
export const isILLAAPiError = (
  error: unknown,
): error is AxiosResponse<ILLAApiError> => {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof error.data === "object" &&
    error.data !== null &&
    "errorCode" in error.data &&
    "errorMessage" in error.data &&
    typeof error.data.errorMessage === "string"
  )
}
