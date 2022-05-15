import Label from "../Label"
import { FC } from "react"
import { LabelWrapperProps } from "./interface"
import { applyLabelWrapperStyle } from "./style"
import TooltipWrapper from "../TooltipWrapper"

const LabelWrapper: FC<LabelWrapperProps> = (props) => {
  const {
    children,
    label,
    labelAlign,
    labelWidth,
    labelPosition,
    labelCaption,
    labelWidthUnit,
    tooltipText,
  } = props

  return (
    <div css={applyLabelWrapperStyle(labelPosition, !!label)}>
      <TooltipWrapper content={tooltipText} disabled={!label}>
        <Label
          label={label}
          labelAlign={labelAlign}
          labelWidth={labelWidth}
          labelCaption={labelCaption}
          labelWidthUnit={labelWidthUnit}
          labelPosition={labelPosition}
        />
      </TooltipWrapper>

      <TooltipWrapper content={tooltipText} disabled={!!label}>
        {children}
      </TooltipWrapper>
    </div>
  )
}
export default LabelWrapper
