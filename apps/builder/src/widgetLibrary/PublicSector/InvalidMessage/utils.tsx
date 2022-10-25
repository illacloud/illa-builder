import { ValidateCheckProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import i18n from "@/i18n/config"

export const invalidMessage = new Map<string, string>([
  ["maxLength", "editor.validate_message.max_length"],
  ["minLength", "editor.validate_message.min_length"],
  ["maxValue", "editor.validate_message.max_value"],
  ["minValue", "editor.validate_message.min_value"],
  ["regex", "editor.validate_message.regex"],
  ["url", "editor.validate_message.url"],
  ["email", "editor.validate_message.email"],
  ["required", "editor.validate_message.required"],
])

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
        return i18n.t(invalidMessage.get("email")!)
      }
      return i18n.t(invalidMessage.get("email")!)
    }
    case "URL": {
      if (
        (typeof value === "string" && !isValidURL(value)) ||
        typeof value === "undefined"
      ) {
        return i18n.t(invalidMessage.get("url")!)
      }
      return i18n.t(invalidMessage.get("url")!)
    }
    case "Regex":
      if (!reg || typeof value === undefined) return
      try {
        const stringValue = JSON.stringify(value)
        const matchPattern = new RegExp(reg)
        if (!matchPattern.test(stringValue)) {
          return i18n.t(invalidMessage.get("regex")!)
        }
      } catch (e) {
        console.error("regex error", e)
      }
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

  if (handleCheckIsRequired(options.value, options.required)) {
    return i18n.t(invalidMessage.get("required")!)
  }

  if (handleCheckMaxLength(options.value, options.maxLength)) {
    return i18n.t(invalidMessage.get("maxLength")!, {
      number: options.maxLength,
    })
  }

  if (handleCheckMinLength(options.value, options.minLength)) {
    return i18n.t(invalidMessage.get("minLength")!, {
      number: options.minLength,
    })
  }
  return handleCheckPattern(options.value, options.pattern, options.regex)
}
