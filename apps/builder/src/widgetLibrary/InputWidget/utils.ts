import {
  getValidateVFromString,
  handleValidateCheck,
} from "../PublicSector/InvalidMessage/utils"
import { InputWidgetProps } from "./interface"

export const getValidateMessageFunc = (
  value: string | undefined,
  options: {
    hideValidationMessage?: InputWidgetProps["hideValidationMessage"]
    pattern?: InputWidgetProps["pattern"]
    regex?: InputWidgetProps["regex"]
    minLength?: InputWidgetProps["minLength"]
    maxLength?: InputWidgetProps["maxLength"]
    required?: InputWidgetProps["required"]
    customRule?: InputWidgetProps["customRule"]
  } = {},
) => {
  const {
    hideValidationMessage,
    pattern,
    regex,
    maxLength,
    minLength,
    required,
    customRule,
  } = options
  if (!hideValidationMessage) {
    const message = handleValidateCheck({
      value: getValidateVFromString(value),
      pattern,
      regex,
      minLength,
      maxLength,
      required,
      customRule,
    })
    const showMessage = message && message.length > 0
    return showMessage ? message : ""
  }
  return ""
}
