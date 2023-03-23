import { cloneDeep } from "lodash"
import { FC, useLayoutEffect, useRef, useState } from "react"
import useMeasure from "react-use-measure"
import { CodeEditor } from "@/components/CodeEditor"
import { ModalBodyContent } from "@/components/CodeEditor/ModalCodeMirror/interface"
import {
  applyCodeMirrorWrapperStyle,
  codeMirrorContainerStyle,
  contentWrapperStyle,
  descriptionStyle,
} from "@/components/CodeEditor/ModalCodeMirror/style"

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
        <p css={descriptionStyle} ref={descriptionRef}>
          {description}
        </p>
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
