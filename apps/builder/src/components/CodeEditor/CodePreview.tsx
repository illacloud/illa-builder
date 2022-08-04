import { FC, HTMLAttributes } from "react"
import { ResultPreview } from "./interface"
import {
  applyPreviewStyle,
  contentTextStyle,
  copyIconStyle,
  iconStyle,
  typeTextStyle,
} from "./style"
import { ErrorIcon, CopyIcon } from "@illa-design/icon"
import { isString } from "@illa-design/system"
import { Message } from "@illa-design/message"
import copy from "copy-to-clipboard"

interface CodePreviewProps extends HTMLAttributes<HTMLDivElement> {
  preview?: ResultPreview
}

function copyToClipboard(content: any) {
  const stringifiedContent = isString(content)
    ? content
    : JSON.stringify(content, null, 2)
  copy(stringifiedContent)
  Message.success("copied to clipboard")
}

export const CodePreview: FC<CodePreviewProps> = (props) => {
  const { className, preview, ...otherProps } = props

  return (
    <div className={className} css={applyPreviewStyle(preview?.state)}>
      <CopyIcon
        css={copyIconStyle}
        size={"10px"}
        onClick={() => {
          copyToClipboard(preview?.content)
        }}
      />
      {preview?.state === "error" ? (
        <div css={typeTextStyle}>
          <ErrorIcon size={"12px"} css={iconStyle} />
          Error
        </div>
      ) : (
        <div css={typeTextStyle}>{preview?.type}</div>
      )}
      <div css={contentTextStyle}>
        {preview?.type === "String" ? (
          <span>"{preview?.content}"</span>
        ) : (
          `${preview?.content}`
        )}
      </div>
    </div>
  )
}

CodePreview.displayName = "CodePreview"
