import { FC } from "react"
import { ErrorIcon } from "@illa-design/react"
import {
  contentWrapperStyle,
  titleWrapperStyle,
  widgetBoundaryWrapperStyle,
} from "./style"

export const WidgetErrorBoundary: FC = () => {
  return (
    <div css={widgetBoundaryWrapperStyle}>
      <div css={titleWrapperStyle}>
        <ErrorIcon size="12px" />
        <span>Error</span>
      </div>
      <div css={contentWrapperStyle}>Configuration error, please modify</div>
    </div>
  )
}
