import { FC } from "react"
import useMeasure from "react-use-measure"
import { getColor } from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import { ModalBodyContent } from "@/components/CodeEditor/ModalCodeMirror/interface"
import {
  applyCodeMirrorWrapperStyle,
  codeMirrorContainerStyle,
  contentWrapperStyle,
  descriptionStyle,
} from "@/components/CodeEditor/ModalCodeMirror/style"
import { ILLAMarkdown } from "@/components/ILLAMarkdown"

export const ModalContent: FC<ModalBodyContent> = (props) => {
  const {
    description,
    lang,
    expectValueType,
    onChange,
    value,
    placeholder,
    wrappedCodeFunc,
    scopeOfAutoComplete,
    codeType,
  } = props

  const [ref, rect] = useMeasure()

  return (
    <div css={contentWrapperStyle}>
      {description && (
        <div css={descriptionStyle} ref={ref}>
          <ILLAMarkdown
            textString={description}
            textColor={getColor("grayBlue", "04")}
            urlColor="grayBlue"
          />
        </div>
      )}
      <div css={applyCodeMirrorWrapperStyle(rect.height)}>
        <CodeEditor
          placeholder={placeholder}
          showLineNumbers
          height="100%"
          minHeight="88px"
          maxHeight="100%"
          value={value}
          lang={lang}
          canShowCompleteInfo
          expectValueType={expectValueType}
          wrapperCss={codeMirrorContainerStyle}
          onChange={onChange}
          canExpand={false}
          wrappedCodeFunc={wrappedCodeFunc}
          scopeOfAutoComplete={scopeOfAutoComplete}
          codeType={codeType}
        />
      </div>
    </div>
  )
}
