import { FC } from "react"
import { Checkbox } from "@illa-design/react"
import { checkboxItemStyle } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/style"
import { CheckboxInputProps } from "@/page/App/components/CheckboxInput/interface"
import { InputEditor } from "@/page/App/components/InputEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { actionItemStyle, codeEditorLabelStyle } from "./style"

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
    expectedType = VALIDATION_TYPES.STRING,
  } = props
  return (
    <>
      <div css={actionItemStyle}>
        <span css={codeEditorLabelStyle}></span>
        <Checkbox
          colorScheme="techPurple"
          checked={checkboxValue}
          ml="16px"
          onChange={onCheckboxChange}
        />
        <span css={checkboxItemStyle}>{checkboxTitle}</span>
      </div>
      {checkboxValue && (
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
