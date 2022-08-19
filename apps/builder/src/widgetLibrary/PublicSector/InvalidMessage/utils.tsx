import { ValidateCheckProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"

export const handleValidateCheck = (
  props?: ValidateCheckProps,
): string | undefined => {
  if (!props || props.value === undefined) return
  if (props.required && props.value.length === 0) {
    return invalidMessage.get("required")
  }
  if (props.maxLength && props.value.length > props.maxLength) {
    return invalidMessage
      .get("maxLength")
      ?.replace("${1}", props.maxLength.toString())
  }
  if (props.minLength && props.value.length < props.minLength) {
    return invalidMessage
      .get("minLength")
      ?.replace("${1}", props.minLength.toString())
  }

  switch (props.pattern) {
    case "Email":
      return validateEmail(props.value)
    case "URL":
      return isValidURL(props.value)
    case "Regex":
      if (!props.regex) return
      const matchPattern = new RegExp(props.regex)
      return matchPattern.test(props.value)
        ? undefined
        : invalidMessage.get("regex")
  }
}

const validateEmail = (email: string) => {
  const str =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const emailMatchPattern = new RegExp(str)
  return emailMatchPattern.test(email) ? undefined : invalidMessage.get("email")
}

function isValidURL(str: string) {
  const matchStr = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/
  const urlMatchPattern = new RegExp(matchStr)
  return urlMatchPattern.test(str) ? undefined : invalidMessage.get("url")
}

export const invalidMessage = new Map<string, string>([
  ["maxLength", "Must be no more than ${1} characters"],
  ["minLength", "Must be at least ${1} characters"],
  ["maxValue", "Must be less than ${1}"],
  ["minValue", "Must be greater than ${1}"],
  ["regex", "Please match the requested format"],
  ["url", "Please enter a valid URL"],
  ["email", "Please enter a valid email address"],
  ["required", "This field is required"],
])
