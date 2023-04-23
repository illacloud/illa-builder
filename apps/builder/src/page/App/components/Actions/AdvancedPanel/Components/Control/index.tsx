import { FC } from "react"
import { AdvancedPanelControlProps } from "./interface"
import {
  applyControllerContainerStyle,
  controlTitleStyle,
  controlWrapperStyle,
  notAllowedMask,
  subtitleStyle,
} from "./style"

export const AdvancedPanelControl: FC<AdvancedPanelControlProps> = (props) => {
  const { title, children, disabled, subtitle } = props
  return (
    <div css={applyControllerContainerStyle(disabled)}>
      <h6 css={controlTitleStyle}>{title}</h6>
      <div css={controlWrapperStyle}>
        {children}
        {subtitle && <span css={subtitleStyle}>{subtitle}</span>}
        {disabled && <div css={notAllowedMask} />}
      </div>
    </div>
  )
}
