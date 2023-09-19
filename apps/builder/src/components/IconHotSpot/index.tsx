import { FC } from "react"
import { IconHotSpotProps } from "./interface"
import { iconHotSpotContainerStyle } from "./style"

export const IconHotSpot: FC<IconHotSpotProps> = (props) => {
  const { children, iconSize, inactiveColor, activeColor } = props
  return (
    <span css={iconHotSpotContainerStyle(iconSize, activeColor, inactiveColor)}>
      {children}
    </span>
  )
}
