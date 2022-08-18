import { forwardRef, useMemo } from "react"
import LabelProps from "./interface"
import {
  applyLabelNameStyle,
  applyLabelStyle,
  labelCaptionCss,
  labelRequiredCss,
  labelTitleStyle,
} from "./styles"

export const Label = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const {
    label,
    labelAlign = "left",
    labelCaption,
    labelPosition = "left",
    labelHidden,
    labelWidth = 0,
    labelWidthUnit = "%",
    labelFull = false,
    required,
    hasTooltip = false,
  } = props

  const renderLabelTitleRequired = useMemo(() => {
    return required ? <span css={labelRequiredCss}>*</span> : null
  }, [required])

  const renderLabelTitle = useMemo(() => {
    return (
      <span css={labelTitleStyle}>
        <span css={applyLabelNameStyle(hasTooltip)}>{label}</span>
        {renderLabelTitleRequired}
      </span>
    )
  }, [label, renderLabelTitleRequired, hasTooltip])

  const renderLabelCaption = useMemo(() => {
    return labelCaption ? <div css={labelCaptionCss}>{labelCaption}</div> : null
  }, [labelCaption])

  const realLabelWidth = !labelWidth ? undefined : labelWidth + labelWidthUnit

  return !labelHidden && label ? (
    <label
      css={applyLabelStyle(
        labelPosition,
        labelAlign,
        realLabelWidth,
        labelFull,
      )}
      ref={ref}
    >
      {renderLabelTitle}
      {renderLabelCaption}
    </label>
  ) : null
})

Label.displayName = "SetterLabel"

export default Label
