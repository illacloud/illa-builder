import { FC } from "react"
import { containerStyle } from "./style"

interface PreviewAppImageProps {
  showPreviewSrc: string
}

const PreviewAppImage: FC<PreviewAppImageProps> = ({ showPreviewSrc }) => {
  return (
    <div css={containerStyle}>
      <img src={showPreviewSrc} width="100%" />
    </div>
  )
}

export default PreviewAppImage
