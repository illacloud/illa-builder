import { isObject } from "@/utils/typeHelper"

export enum VALIDATION_TYPES {
  STRING = "String",
  NUMBER = "Number",
  BOOLEAN = "Boolean",
  ARRAY = "Array",
  OBJECT = "Object",
}

export interface ValidationResponse {
  isValid: boolean
  safeValue: any
  errorMessage?: string
}

export type ValidateFunctionType = (value: unknown) => ValidationResponse

// TODO: @weichen errorMessage i18n
export const validationFactory: Record<string, ValidateFunctionType> = {
  [VALIDATION_TYPES.STRING]: value => {
    if (value == undefined || value === "") {
      return {
        isValid: true,
        safeValue: undefined,
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
  [VALIDATION_TYPES.BOOLEAN]: value => {
    if (value == undefined || value === "") {
      return {
        isValid: true,
        safeValue: undefined,
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
  [VALIDATION_TYPES.NUMBER]: value => {
    if (value == undefined || value === "") {
      return {
        isValid: true,
        safeValue: undefined,
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
  [VALIDATION_TYPES.ARRAY]: value => {
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
  [VALIDATION_TYPES.OBJECT]: value => {
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
