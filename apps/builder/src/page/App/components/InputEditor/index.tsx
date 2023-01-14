import { FC } from "react"
import { CodeEditor } from "@/components/CodeEditor"
import { ControlledInputProps } from "@/page/App/components/InputEditor/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import {
  actionItemCodeEditorStyle,
  actionItemStyle,
  actionItemTip,
  codeEditorLabelStyle,
} from "./style"

export const InputEditor: FC<ControlledInputProps> = (props) => {
  const {
    title,
    onChange,
    expectedType = VALIDATION_TYPES.STRING,
    value,
    tips,
    placeholder,
    style = {},
    mode = "TEXT_JS",
    lineNumbers = false,
  } = props
  return (
    <>
      <div css={actionItemStyle}>
        {title && <span css={codeEditorLabelStyle}>{title}</span>}
        <CodeEditor
          {...style}
          lineNumbers={lineNumbers}
          css={actionItemCodeEditorStyle}
          mode={mode}
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
