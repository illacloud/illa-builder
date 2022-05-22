import Label from "../Label"
import { FC, useMemo } from "react"
import { LabelWrapperProps } from "./interface"
import { applyLabelWrapperStyle } from "./style"
import { Tooltip } from "@illa-design/tooltip"

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

  const labelToolTipsPosition = useMemo(
    () => (labelAlign === "left" ? "tl" : "tr"),
    [labelAlign],
  )

  return (
    <div css={applyLabelWrapperStyle(labelPosition, !!label)}>
      <Tooltip
        content={tooltipText}
        disabled={!label || !tooltipText}
        position={labelToolTipsPosition}
        showArrow={false}
        autoFitPosition={false}
      >
        <Label
          label={label}
          labelAlign={labelAlign}
          labelWidth={labelWidth}
          labelCaption={labelCaption}
          labelWidthUnit={labelWidthUnit}
          labelPosition={labelPosition}
          hasTooltip={!!tooltipText}
        />
      </Tooltip>

      <Tooltip
        content={tooltipText}
        disabled={!!label || !tooltipText}
        position="tl"
        showArrow={false}
        autoFitPosition={false}
      >
        {children}
      </Tooltip>
    </div>
  )
}
export default LabelWrapper
