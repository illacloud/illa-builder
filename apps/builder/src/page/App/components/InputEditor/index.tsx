import { FC } from "react"
import { CodeEditor } from "@/components/CodeEditor"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
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
    mode = CODE_LANG.JAVASCRIPT,
    lineNumbers = false,
    sqlScheme,
  } = props
  return (
    <>
      <div css={actionItemStyle}>
        {title && <span css={codeEditorLabelStyle}>{title}</span>}
        <CodeEditor
          {...style}
          singleLine={!lineNumbers}
          showLineNumbers={lineNumbers}
          wrapperCss={actionItemCodeEditorStyle}
          lang={mode}
          value={value}
          sqlScheme={sqlScheme}
          onChange={onChange}
          expectValueType={expectedType}
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
