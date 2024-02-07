import {
  getValidateVFromString,
  handleValidateCheck,
} from "../PublicSector/InvalidMessage/utils"
import { EditableTextWidgetProps } from "./interface"

export const getValidateMessageFunc = (
  value: string | undefined,
  options: {
    hideValidationMessage?: EditableTextWidgetProps["hideValidationMessage"]
    pattern?: EditableTextWidgetProps["pattern"]
    regex?: EditableTextWidgetProps["regex"]
    minLength?: EditableTextWidgetProps["minLength"]
    maxLength?: EditableTextWidgetProps["maxLength"]
    required?: EditableTextWidgetProps["required"]
    customRule?: EditableTextWidgetProps["customRule"]
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
