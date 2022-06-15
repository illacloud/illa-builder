import { FC } from "react"
import ReactJson from "react-json-view"
import { JSONViewerProps } from "./interface"
import { jsonViewContainer } from "./style"

export const JSONViewer: FC<JSONViewerProps> = (props) => {
  const { src = {} } = props

  const reactJsonConfig = {
    name: false as const,
    iconStyle: "triangle" as const,
    enableClipboard: false,
    displayObjectSize: false,
    displayDataTypes: false,
    displayArrayKey: false,
    indentWidth: 2,
  }

  return (
    <div css={jsonViewContainer}>
      {/* @ts-ignore */}
      <ReactJson src={src} {...reactJsonConfig} />
    </div>
  )
}

JSONViewer.displayName = "JSONViewer"
