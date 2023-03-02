import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react"
import { LoadingIcon } from "@illa-design/react"
import {
  applyCursor,
  applyShape,
  buttonIconStyle,
  buttonStyle,
} from "@/widgetLibrary/PdfWidget/style"

export type ToolButtonShape = "square" | "round"

export interface ToolButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  icon?: ReactNode
  shape?: ToolButtonShape
}

export const ToolButton = forwardRef<HTMLButtonElement, ToolButtonProps>(
  (props, ref) => {
    const { loading, icon, shape = "square", ...rest } = props
    return (
      <button
        css={[buttonStyle, applyCursor(loading), applyShape(shape)]}
        ref={ref}
        {...rest}
      >
        {(loading || icon) && (
          <span css={buttonIconStyle}>
            {loading ? <LoadingIcon spin={true} /> : icon}
          </span>
        )}
      </button>
    )
  },
)

ToolButton.displayName = "ToolButton"
