import { FC, HTMLAttributes, useEffect } from "react"
import { ResultPreview } from "./interface"
import { applyPreviewStyle } from "@/components/CodeEditor/style"

interface CodePreviewProps extends HTMLAttributes<HTMLDivElement> {
  preview?: ResultPreview
}

export const CodePreview: FC<CodePreviewProps> = (props) => {
  const { className, preview = { type: "String" }, ...otherProps } = props

  return (
    <div className={className} css={applyPreviewStyle(preview?.state)}>
      <div>{preview?.type}</div>
      <div>"{preview?.content}"</div>
    </div>
  )
}

CodePreview.displayName = "CodePreview"
