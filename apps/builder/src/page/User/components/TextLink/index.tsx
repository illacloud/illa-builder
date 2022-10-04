import { FC } from "react"
import { TextLinkProps } from "./interface"
import { textLinkStyle } from "./style"

export const TextLink: FC<TextLinkProps> = (props) => {
  const { onClick, children, ...rest } = props
  return (
    <span
      css={textLinkStyle}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
      {...rest}
    >
      {children}
    </span>
  )
}

TextLink.displayName = "TextLink"
