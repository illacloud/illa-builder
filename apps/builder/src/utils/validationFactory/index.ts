import { isObject } from "@/utils/typeHelper"

export enum VALIDATION_TYPES {
  STRING = "String",
  NUMBER = "Number",
  BOOLEAN = "Boolean",
  ARRAY = "Array",
  OBJECT = "Object",
  UNDEFINED = "Undefined",
  ANY = "any",
}

export interface ValidationResponse {
  isValid: boolean
  safeValue: any
  errorMessage?: string
}

export type ValidateFunctionType = (
  value: unknown,
  currentListName: string,
) => ValidationResponse

// TODO: @weichen errorMessage i18n
export const validationFactory: Record<string, ValidateFunctionType> = {
  [VALIDATION_TYPES.STRING]: (value, currentListName) => {
    if (value == undefined) {
      return {
        isValid: true,
        safeValue: undefined,
      }
    }
    if (Array.isArray(value) && currentListName) {
      const isString = typeof value[0] === "string"
      if (!isString) {
        return {
          isValid: false,
          safeValue: "",
          errorMessage: "Must be a string",
        }
      }
      return {
        isValid: true,
        safeValue: value[0],
      }
    }
    const isString = typeof value === "string"

    if (!isString) {
      return {
        isValid: false,
        safeValue: "",
        errorMessage: "Must be a string",
      }
    }
    return {
      isValid: true,
      safeValue: value,
    }
  },
  [VALIDATION_TYPES.BOOLEAN]: (value, currentListName) => {
    if (value == undefined || value === "") {
      return {
        isValid: true,
        safeValue: undefined,
      }
    }
    if (Array.isArray(value) && currentListName) {
      return {
        isValid: true,
        safeValue: value[0],
      }
    }
    const isBoolean = typeof value === "boolean"
    if (!isBoolean) {
      return {
        isValid: false,
        safeValue: false,
        errorMessage: "Must be a boolean",
      }
    }
    return {
      isValid: true,
      safeValue: value,
    }
  },
  [VALIDATION_TYPES.NUMBER]: (value, currentListName) => {
    if (value == undefined || value === "") {
      return {
        isValid: true,
        safeValue: undefined,
      }
    }
    if (Array.isArray(value) && currentListName) {
      return {
        isValid: true,
        safeValue: value[0],
      }
    }
    const isNumber = typeof value === "number"
    if (!isNumber) {
      return {
        isValid: false,
        safeValue: 0,
        errorMessage: "Must be a number",
      }
    }
    return {
      isValid: true,
      safeValue: value,
    }
  },
  [VALIDATION_TYPES.ARRAY]: (value) => {
    if (value == undefined || value === "") {
      return {
        isValid: true,
        safeValue: undefined,
      }
    }
    const isArray = Array.isArray(value)
    if (!isArray) {
      return {
        isValid: false,
        safeValue: [],
        errorMessage: "Must be a Array",
      }
    }
    return {
      isValid: true,
      safeValue: value,
    }
  },
  [VALIDATION_TYPES.OBJECT]: (value) => {
    if (value == undefined || value === "") {
      return {
        isValid: true,
        safeValue: undefined,
      }
    }
    const isObjectValue = isObject(value)
    if (!isObjectValue) {
      return {
        isValid: false,
        safeValue: {},
        errorMessage: "Must be a Object",
      }
    }
    return {
      isValid: true,
      safeValue: value,
    }
  },
}
