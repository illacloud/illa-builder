import {
  getValidateVFromString,
  handleValidateCheck,
} from "../PublicSector/InvalidMessage/utils"
import { TextareaWidgetProps } from "./interface"

export const getValidateMessageFunc = (
  value: string | undefined,
  options: {
    hideValidationMessage?: TextareaWidgetProps["hideValidationMessage"]
    pattern?: TextareaWidgetProps["pattern"]
    regex?: TextareaWidgetProps["regex"]
    minLength?: TextareaWidgetProps["minLength"]
    maxLength?: TextareaWidgetProps["maxLength"]
    required?: TextareaWidgetProps["required"]
    customRule?: TextareaWidgetProps["customRule"]
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
