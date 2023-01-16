import { FC } from "react"
import { Checkbox } from "@illa-design/react"
import { CheckboxInputProps } from "@/page/App/components/CheckboxInput/interface"
import { InputEditor } from "@/page/App/components/InputEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import {
  checkboxItemStyle,
  checkoutContentStyle,
  checkoutItemStyle,
  codeEditorLabelStyle,
} from "./style"

export const CheckboxInput: FC<CheckboxInputProps> = (props) => {
  const {
    onCheckboxChange,
    onValueChange,
    checkboxTitle,
    checkboxValue,
    inputTitle,
    inputValue,
    inputPlaceholder,
    inputTips,
    showInputEditor = true,
    expectedType = VALIDATION_TYPES.STRING,
  } = props
  return (
    <>
      <div css={checkoutItemStyle}>
        <span css={codeEditorLabelStyle}></span>
        <div css={checkoutContentStyle}>
          <Checkbox
            colorScheme="techPurple"
            checked={checkboxValue}
            ml="16px"
            onChange={onCheckboxChange}
          />
          <span css={checkboxItemStyle}>{checkboxTitle}</span>
        </div>
      </div>
      {checkboxValue && showInputEditor && (
        <InputEditor
          title={inputTitle}
          value={inputValue}
          onChange={onValueChange}
          expectedType={expectedType}
          tips={inputTips}
          placeholder={inputPlaceholder}
        />
      )}
    </>
  )
}

CheckboxInput.displayName = "CheckboxInput"
