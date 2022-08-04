import Label from "@/widgetLibrary/PublicSector/Label"
import { FC, useMemo } from "react"
import { LabelWrapperProps } from "./interface"
import { applyLabelWrapperStyle } from "./style"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"

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
    required,
  } = props

  const labelToolTipsPosition = useMemo(
    () => (labelAlign === "left" ? "tl" : "tr"),
    [labelAlign],
  )

  return (
    <div css={applyLabelWrapperStyle(labelPosition, !!label)}>
      <TooltipWrapper
        tooltipText={tooltipText}
        disabled={!label || !tooltipText}
        position={labelToolTipsPosition}
      >
        <Label
          label={label}
          labelAlign={labelAlign}
          labelWidth={labelWidth}
          labelCaption={labelCaption}
          labelWidthUnit={labelWidthUnit}
          labelPosition={labelPosition}
          hasTooltip={!!tooltipText}
          required={required}
        />
      </TooltipWrapper>

      <TooltipWrapper
        tooltipText={tooltipText}
        disabled={!!label || !tooltipText}
        position="tl"
      >
        {children}
      </TooltipWrapper>
    </div>
  )
}
export default LabelWrapper
