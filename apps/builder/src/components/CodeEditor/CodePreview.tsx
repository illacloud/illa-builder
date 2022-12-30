import copy from "copy-to-clipboard"
import { FC, HTMLAttributes } from "react"
import {
  CopyIcon,
  ErrorCircleIcon,
  MessageHandler,
  isString,
  useMessage,
} from "@illa-design/react"
import { ResultPreview } from "./interface"
import {
  applyPreviewStyle,
  contentTextStyle,
  copyIconStyle,
  iconStyle,
  typeTextStyle,
} from "./style"

interface CodePreviewProps extends HTMLAttributes<HTMLDivElement> {
  preview?: ResultPreview
}

function copyToClipboard(content: any, messageHandler: MessageHandler) {
  const stringifyContent = isString(content)
    ? content
    : JSON.stringify(content, null, 2)
  copy(stringifyContent)
  messageHandler.success({
    content: "copied to clipboard",
  })
}

export const CodePreview: FC<CodePreviewProps> = (props) => {
  const { className, preview, ...otherProps } = props

  const message = useMessage()

  return (
    <div className={className} css={applyPreviewStyle(preview?.state)}>
      <CopyIcon
        css={copyIconStyle}
        size={"10px"}
        onClick={() => {
          copyToClipboard(preview?.content, message)
        }}
      />
      {preview?.state === "error" ? (
        <div css={typeTextStyle}>
          <ErrorCircleIcon size={"12px"} css={iconStyle} />
          Error
        </div>
      ) : (
        <div css={typeTextStyle}>{preview?.type}</div>
      )}
      <div css={contentTextStyle}>
        {preview?.type === "String" ? (
          <span>&quot;{preview?.content}&quot;</span>
        ) : (
          `${preview?.content}`
        )}
      </div>
    </div>
  )
}

CodePreview.displayName = "CodePreview"
