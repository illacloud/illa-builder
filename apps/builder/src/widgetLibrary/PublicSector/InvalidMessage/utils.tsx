import i18n from "@/i18n/config"
import { ValidateCheckProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"

const validateEmail = (email: string) => {
  const str =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const emailMatchPattern = new RegExp(str)
  return emailMatchPattern.test(email)
}

function isValidURL(str: string) {
  const matchStr = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/
  const urlMatchPattern = new RegExp(matchStr)
  return urlMatchPattern.test(str)
}

export const handleCheckCustomRule = (customRule: unknown) => {
  if (typeof customRule !== "undefined") {
    return true
  }
}

export const handleCheckIsRequired = (value: unknown, required?: boolean) => {
  if (required && typeof value === "undefined") return true
}

export const handleCheckMaxLength = (value: unknown, maxLength?: number) => {
  if (
    typeof maxLength === "number" &&
    ((typeof value === "string" && value.length > maxLength) ||
      typeof value === "undefined")
  )
    return true
}

export const handleCheckMinLength = (value: unknown, minLength?: number) => {
  if (
    typeof minLength === "number" &&
    ((typeof value === "string" && value.length < minLength) ||
      typeof value === "undefined")
  )
    return true
}

export const handleCheckPattern = (
  value: unknown,
  pattern: ValidateCheckProps["pattern"],
  reg?: string | RegExp,
) => {
  switch (pattern) {
    case "Email": {
      if (
        (typeof value === "string" && !validateEmail(value)) ||
        typeof value === "undefined"
      ) {
        return i18n.t("editor.validate_message.email")
      }
      break
    }
    case "URL": {
      if (
        (typeof value === "string" && !isValidURL(value)) ||
        typeof value === "undefined"
      ) {
        return i18n.t("editor.validate_message.url")
      }
      break
    }
    case "Regex":
      if (!reg || typeof value === undefined) return
      try {
        const stringValue = JSON.stringify(value)
        const matchPattern = new RegExp(reg)
        if (!matchPattern.test(stringValue)) {
          return i18n.t("editor.validate_message.regex")
        }
      } catch (e) {
        console.error("regex error", e)
      }
  }
}

export const calculateFileSize = (data: unknown) => {
  const blobArr = Array.isArray(data) ? data : [data]
  const byteSize = new Blob(blobArr).size
  return byteSize
}

const handleCheckFileSize = (
  value: unknown,
  maxSize?: number,
  minSize?: number,
  maxSizeType?: string,
  minSizeType?: string,
) => {
  if (value && (value as []).length) {
    // default to MB
    const getFileSizeNumber = (type?: string) =>
      type !== "mb" ? 1024 : 1024 * 1024

    const maxSizeNumber = maxSize ? maxSize * getFileSizeNumber(maxSizeType) : 0
    const minSizeNumber = minSize ? minSize * getFileSizeNumber(minSizeType) : 0

    for (let i = 0; i < (value as []).length; i++) {
      const size =
        (value as any)[i].originFile?.size ||
        calculateFileSize((value as any)[i].originFile)

      if (!!maxSizeNumber && size > maxSizeNumber) {
        return {
          hasError: true,
          errorMessage: `The file size can't exceed ${maxSize} ${(
            maxSizeType || "MB"
          ).toUpperCase()}.`,
        }
      }
      if (!!minSizeNumber && size < minSizeNumber) {
        return {
          hasError: true,
          errorMessage: `The file size can't be less than ${minSize} ${(
            minSizeType || "MB"
          ).toUpperCase()}.`,
        }
      }
    }
  }
  return {
    hasError: false,
    errorMessage: "",
  }
}

const handleCheckFilesCount = (
  value: unknown,
  maxFiles?: number,
  minFiles?: number,
) => {
  if (value) {
    const length = (value as []).length
    if (maxFiles && length > maxFiles) {
      return {
        fileCountInvalid: true,
        countErrorMessage: `Support up to ${maxFiles} files.`,
      }
    }
    if (minFiles && length < minFiles) {
      return {
        fileCountInvalid: true,
        countErrorMessage: `At least ${minFiles} files are required.`,
      }
    }
  }
  return {
    fileCountInvalid: false,
    countErrorMessage: "",
  }
}

export const handleValidateCheck = (
  options?: ValidateCheckProps,
): string | undefined => {
  if (typeof options === "undefined") return
  if (handleCheckCustomRule(options.customRule)) {
    try {
      return JSON.stringify(options.customRule)
    } catch (e) {
      console.error("custom rule is error")
    }
  }

  const { hasError, errorMessage } = handleCheckFileSize(
    options.value,
    options.maxSize,
    options.minSize,
    options.maxSizeType,
    options.minSizeType,
  )
  if (hasError) {
    return errorMessage
  }

  const { fileCountInvalid, countErrorMessage } = handleCheckFilesCount(
    options.value,
    options.maxFiles,
    options.minFiles,
  )
  if (fileCountInvalid) {
    return countErrorMessage
  }

  if (handleCheckIsRequired(options.value, options.required)) {
    return i18n.t("editor.validate_message.required")
  }

  if (handleCheckMaxLength(options.value, options.maxLength)) {
    return i18n.t("editor.validate_message.max_length", {
      number: options.maxLength,
    })
  }

  if (handleCheckMinLength(options.value, options.minLength)) {
    return i18n.t("editor.validate_message.min_value", {
      number: options.minLength,
    })
  }
  return handleCheckPattern(options.value, options.pattern, options.regex)
}
