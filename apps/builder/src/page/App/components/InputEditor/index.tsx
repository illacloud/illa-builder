import { FC } from "react"
import { ControlledInputProps } from "@/page/App/components/InputEditor/interface"
import {
  actionItemCodeEditorStyle,
  actionItemStyle,
  codeEditorLabelStyle,
  actionItemTip,
} from "./style"
import { CodeEditor } from "@/components/CodeEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const InputEditor: FC<ControlledInputProps> = (props) => {
  const {
    title,
    onChange,
    expectedType = VALIDATION_TYPES.STRING,
    value,
    tips,
    placeholder,
  } = props
  return (
    <>
      <div css={actionItemStyle}>
        <span css={codeEditorLabelStyle}>{title}</span>
        <CodeEditor
          css={actionItemCodeEditorStyle}
          mode="TEXT_JS"
          value={value}
          onChange={onChange}
          expectedType={expectedType}
          placeholder={placeholder}
        />
      </div>
      {tips && (
        <div css={actionItemTip}>
          <span>{tips}</span>
        </div>
      )}
    </>
  )
}

InputEditor.displayName = "InputEditor"
