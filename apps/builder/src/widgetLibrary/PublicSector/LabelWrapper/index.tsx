import { FC, memo, useMemo } from "react"
import { Label } from "@/widgetLibrary/PublicSector/Label"
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
    labelHidden,
    labelFull,
    tooltipText,
    required,
  } = props

  const renderContent = useMemo(() => {
    if (label) {
      return (
        <>
          <TooltipWrapper
            tooltipText={tooltipText}
            disabled={!label || !tooltipText}
            position="tl"
          >
            <Label
              labelFull={labelFull}
              label={label}
              labelAlign={labelAlign}
              labelWidth={labelWidth}
              labelCaption={labelCaption}
              labelWidthUnit={labelWidthUnit}
              labelPosition={labelPosition}
              required={required}
              labelHidden={labelHidden}
              hasTooltip={!!tooltipText}
            />
          </TooltipWrapper>
          {children}
        </>
      )
    }
    return (
      <TooltipWrapper
        tooltipText={tooltipText}
        disabled={!!label || !tooltipText}
        position="tl"
      >
        {children}
      </TooltipWrapper>
    )
  }, [
    children,
    label,
    labelAlign,
    labelWidth,
    labelPosition,
    labelCaption,
    labelWidthUnit,
    labelHidden,
    labelFull,
    tooltipText,
    required,
  ])

  return renderContent
}

export const MemoLabelWrapper = memo(LabelWrapper)
