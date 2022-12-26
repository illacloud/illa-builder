import { FC } from "react"
import {
  applyPreviewColumnsStyle,
  previewColumnsWrapperStyle,
} from "@/page/App/components/DotPanel/style"

interface PreviewColumnsChangeProps {
  columns: number
  unitWidth: number
}
export const PreviewColumnsChange: FC<PreviewColumnsChangeProps> = (props) => {
  const { columns, unitWidth } = props
  return (
    <div css={previewColumnsWrapperStyle}>
      {new Array(columns).fill(0).map((_, index) => {
        return (
          <div key={index} css={applyPreviewColumnsStyle(index, unitWidth)} />
        )
      })}
    </div>
  )
}
