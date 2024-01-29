import { FC, useMemo } from "react"
import { Popover } from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { ControlledInputProps } from "@/page/App/components/Actions/InputEditor/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import SQLModeTip from "../ActionPanel/pulicComponent/SQLModeTip"
import {
  actionItemCodeEditorStyle,
  actionItemStyle,
  actionItemTip,
  codeEditorLabelStyle,
  codeEditorSublabelStyle,
  sqlModeTipStyle,
} from "./style"

export const InputEditor: FC<ControlledInputProps> = (props) => {
  const {
    title,
    onChange,
    expectedType = VALIDATION_TYPES.STRING,
    value,
    tips,
    showSafeModeTips,
    subtitle,
    handleSubtitleClick,
    placeholder,
    style = {},
    mode = CODE_LANG.JAVASCRIPT,
    lineNumbers = false,
    sqlScheme,
    canShowCompleteInfo,
    popoverContent,
    codeType,
    hasExpectedType = true,
  } = props

  const titleNode = useMemo(
    () => (
      <span css={codeEditorLabelStyle}>
        <span>{title}</span>
        {subtitle && (
          <span css={codeEditorSublabelStyle} onClick={handleSubtitleClick}>
            {subtitle}
          </span>
        )}
      </span>
    ),
    [handleSubtitleClick, subtitle, title],
  )

  return (
    <div style={{ width: "100%" }}>
      <div css={actionItemStyle}>
        {title && (
          <>
            {popoverContent ? (
              <Popover
                content={popoverContent}
                hasCloseIcon={false}
                trigger="hover"
                colorScheme="gray"
                showArrow={false}
              >
                {titleNode}
              </Popover>
            ) : (
              <>{titleNode}</>
            )}
          </>
        )}
        <CodeEditor
          {...style}
          singleLine={!lineNumbers}
          showLineNumbers={lineNumbers}
          wrapperCss={actionItemCodeEditorStyle}
          lang={mode}
          value={value}
          sqlScheme={sqlScheme}
          onChange={onChange}
          expectValueType={hasExpectedType ? expectedType : undefined}
          placeholder={placeholder}
          modalTitle={title}
          codeType={codeType}
          canShowCompleteInfo={canShowCompleteInfo}
        />
      </div>
      {tips && (
        <div css={actionItemTip}>
          <span>{tips}</span>
        </div>
      )}
      {showSafeModeTips && (
        <SQLModeTip value={value} _css={sqlModeTipStyle(!!title)} />
      )}
    </div>
  )
}

InputEditor.displayName = "InputEditor"
