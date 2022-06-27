import { forwardRef } from "react"
import { WrapperProps } from "./interface"
import { css } from "@emotion/react"

export const Wrapper = forwardRef<HTMLDivElement, WrapperProps>(
  (props, ref) => {
    const { className, h, w } = props

    const sizeCss = css`
      display: flex;
      align-items: center;
      width: ${w ?? "auto"};
      height: ${h ?? "auto"};
    `

    return (
      <div className={className} css={sizeCss}>
        {props.children}
      </div>
    )
  },
)

Wrapper.displayName = "Wrapper"
