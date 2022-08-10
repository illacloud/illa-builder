import { forwardRef, useMemo } from "react"
import LabelProps from "./interface"
import {
  applyLabelNameStyle,
  applyLabelStyle,
  labelCaptionCss,
  labelRequiredCss,
  labelTitleStyle,
} from "./styles"

const Label = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const {
    label,
    labelAlign = "left",
    labelCaption,
    labelPosition = "left",
    labelHidden,
    labelWidth = 33,
    labelWidthUnit = "%",
    labelFull = false,
    required,
    hasTooltip = false,
    ...rest
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
  }, [label, renderLabelTitleRequired, hasTooltip, labelAlign])

  const renderLabelCaption = useMemo(() => {
    return labelCaption ? <div css={labelCaptionCss}>{labelCaption}</div> : null
  }, [labelCaption])

  return !labelHidden && label ? (
    <label
      css={applyLabelStyle(
        labelPosition,
        labelAlign,
        labelWidth + labelWidthUnit,
        labelFull,
      )}
      ref={ref}
      {...rest}
    >
      {renderLabelTitle}
      {renderLabelCaption}
    </label>
  ) : null
})

export default Label
