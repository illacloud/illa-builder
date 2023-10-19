import { FC } from "react"
import { HeaderProps } from "./interface"
import { settingHeaderStyle, titleStyle } from "./style"

export const Header: FC<HeaderProps> = (props) => {
  const { title, extra } = props
  return (
    <div css={settingHeaderStyle}>
      <h2 css={titleStyle}>{title}</h2>
      {extra && <div>{extra}</div>}
    </div>
  )
}
