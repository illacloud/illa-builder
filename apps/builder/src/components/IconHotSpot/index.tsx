import { ForwardRefRenderFunction, forwardRef } from "react"
import { IconHotSpotProps } from "./interface"
import { iconHotSpotContainerStyle } from "./style"

const IconHotSpot: ForwardRefRenderFunction<
  HTMLSpanElement,
  IconHotSpotProps
> = (props, ref) => {
  const {
    children,
    iconSize = 16,
    inactiveColor,
    activeColor,
    ...otherProps
  } = props

  return (
    <span
      {...otherProps}
      css={iconHotSpotContainerStyle(iconSize, activeColor, inactiveColor)}
      ref={ref}
    >
      {children}
    </span>
  )
}

export default forwardRef<HTMLSpanElement, IconHotSpotProps>(IconHotSpot)
