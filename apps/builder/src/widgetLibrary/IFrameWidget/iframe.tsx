import { FC } from "react"
import { IFrameWidgetProps } from "@/widgetLibrary/IFrameWidget/interface"
import { iframeContainer } from "@/widgetLibrary/IFrameWidget/style"

export const IFrameWidget: FC<IFrameWidgetProps> = (props) => {
  const { src } = props
  return (
    <iframe allow="*" allowFullScreen={true} css={iframeContainer} src={src} />
  )
}
IFrameWidget.displayName = "IFrameWidget"
export default IFrameWidget
