import { FC, useLayoutEffect, useRef, useState } from "react"
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
  const { description, lang, expectValueType, onChange, value, placeholder } =
    props

  const descriptionRef = useRef<HTMLParagraphElement | null>(null)
  const [canRender, setCanRender] = useState(false)
  const [descriptionHeight, setDescriptionHeight] = useState(0)

  useLayoutEffect(() => {
    if (descriptionRef.current) {
      const { height } = descriptionRef.current.getBoundingClientRect()
      setDescriptionHeight(height)
    }
    setCanRender(true)
    return () => {
      if (descriptionRef.current) {
        descriptionRef.current = null
      }
    }
  }, [])

  return (
    <div css={contentWrapperStyle}>
      {description && (
        <div css={descriptionStyle} ref={descriptionRef}>
          <ILLAMarkdown
            textString={description}
            textColor={getColor("grayBlue", "04")}
            urlColor="grayBlue"
          />
        </div>
      )}
      {canRender && (
        <div css={applyCodeMirrorWrapperStyle(descriptionHeight)}>
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
          />
        </div>
      )}
    </div>
  )
}
