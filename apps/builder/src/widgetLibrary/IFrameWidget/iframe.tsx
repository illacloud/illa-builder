import { FC } from "react"
import { useSelector } from "react-redux"
import { getIsResizing } from "@/redux/currentApp/executionTree/executionSelector"
import { IFrameWidgetProps } from "@/widgetLibrary/IFrameWidget/interface"
import { applyIframeContainer } from "@/widgetLibrary/IFrameWidget/style"

export const IFrameWidget: FC<IFrameWidgetProps> = (props) => {
  const { src } = props

  const isResizingGlobal = useSelector(getIsResizing)

  return (
    <iframe
      allow="*"
      allowFullScreen={true}
      css={applyIframeContainer(isResizingGlobal)}
      src={src}
    />
  )
}
IFrameWidget.displayName = "IFrameWidget"
export default IFrameWidget
