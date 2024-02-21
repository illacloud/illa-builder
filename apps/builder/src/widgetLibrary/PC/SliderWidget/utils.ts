import {
  getValidateVFromString,
  handleValidateCheck,
} from "../PublicSector/InvalidMessage/utils"
import { SliderWidgetProps } from "./interface"

export const getValidateMessageFunc = (
  value: number | number[] | undefined,
  options: {
    hideValidationMessage?: SliderWidgetProps["hideValidationMessage"]
    required?: SliderWidgetProps["required"]
    customRule?: SliderWidgetProps["customRule"]
  } = {},
) => {
  const { hideValidationMessage, required, customRule } = options
  if (!hideValidationMessage) {
    const message = handleValidateCheck({
      value: getValidateVFromString(value),
      required,
      customRule,
    })
    const showMessage = message && message.length > 0
    return showMessage ? message : ""
  }
  return ""
}
