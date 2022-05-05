import { FC } from "react"
import { WrapperProps } from "./interface"
import { css } from "@emotion/react"

export const Wrapper: FC<WrapperProps> = (props) => {
  const { className, h, w } = props

  const sizeCss = css`
    width: ${w ?? "fit-content"};
    height: ${h ?? "fit-content"};
    border: solid 0.5px pink;
  `

  return (
    <div className={className} css={sizeCss}>
      {props.children}
    </div>
  )
}

Wrapper.displayName = "QueryEditor"
