import { FC, memo } from "react"
import ActionPanelLabel from "../Label"
import { HorizontalWithLabelProps } from "./interface"
import { horizontalWithLabelContainerStyle } from "./style"

const HorizontalWithLabel: FC<HorizontalWithLabelProps> = (props) => {
  const { labelName, children } = props
  return (
    <div css={horizontalWithLabelContainerStyle}>
      <ActionPanelLabel name={labelName} />
      {children}
    </div>
  )
}

HorizontalWithLabel.displayName = "HorizontalWithLabel"

export default memo(HorizontalWithLabel)
