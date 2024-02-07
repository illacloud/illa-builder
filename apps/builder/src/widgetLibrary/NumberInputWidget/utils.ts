import {
  getValidateVFromString,
  handleValidateCheck,
} from "../PublicSector/InvalidMessage/utils"
import { NumberInputWidgetProps } from "./interface"

export const getValidateMessageFunc = (
  value: unknown,
  options: {
    hideValidationMessage?: NumberInputWidgetProps["hideValidationMessage"]
    pattern?: NumberInputWidgetProps["pattern"]
    regex?: NumberInputWidgetProps["regex"]
    required?: NumberInputWidgetProps["required"]
    customRule?: NumberInputWidgetProps["customRule"]
  } = {},
) => {
  const {
    hideValidationMessage,
    pattern,
    regex,

    required,
    customRule,
  } = options
  if (!hideValidationMessage) {
    const message = handleValidateCheck({
      value: getValidateVFromString(value),
      pattern,
      regex,
      required,
      customRule,
    })
    const showMessage = message && message.length > 0
    return showMessage ? message : ""
  }
  return ""
}
