import { forwardRef, useMemo } from "react"
import LabelProps from "./interface"
import {
  applyLabelStyle,
  applyLabelTitleStyle,
  labelCaptionCss,
  labelNameStyle,
  labelRequiredCss,
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
    required,
    hasTooltip = false,
    ...rest
  } = props

  const renderLabelTitleRequired = useMemo(() => {
    return required ? <span css={labelRequiredCss}>*</span> : null
  }, [required])

  const renderLabelTitle = useMemo(() => {
    return (
      <div css={applyLabelTitleStyle(hasTooltip)}>
        <span css={labelNameStyle}>{label}</span>
        {renderLabelTitleRequired}
      </div>
    )
  }, [label, renderLabelTitleRequired, hasTooltip])

  const renderLabelCaption = useMemo(() => {
    return labelCaption ? <div css={labelCaptionCss}>{labelCaption}</div> : null
  }, [labelCaption])

  return !labelHidden && label ? (
    <label
      css={applyLabelStyle(
        labelPosition,
        labelAlign,
        labelWidth + labelWidthUnit,
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
