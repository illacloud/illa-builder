import { FC } from "react"
import { WrapperProps } from "./interface"
import { css } from "@emotion/react"

export const Wrapper: FC<WrapperProps> = (props) => {
  const { className, h, w } = props

  const sizeCss = css`
    display: flex;
    align-items: center;
    width: ${w ?? "100%"};
    height: ${h ?? "100%"};
  `

  return (
    <div className={className} css={sizeCss}>
      {props.children}
    </div>
  )
}

Wrapper.displayName = "Wrapper"
