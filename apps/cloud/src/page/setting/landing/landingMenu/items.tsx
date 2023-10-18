import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { NextIcon } from "@illa-design/react"
import { menuItemStyle, rightIconStyle } from "../style"
import { LandingMenuItemProps } from "./interface"

export const Item: FC<LandingMenuItemProps> = ({ item }) => {
  const navigate = useNavigate()

  const handleClick = (key: string) => {
    navigate(key)
  }
  return (
    <div
      css={menuItemStyle}
      onClick={() => (item.onClick ? item.onClick() : handleClick(item.path))}
    >
      <div>{item.label}</div>
      <NextIcon css={rightIconStyle} />
    </div>
  )
}
