import { useMemo, forwardRef } from "react"
import LabelProps from "./interface"
import {
  applyLabelStyle,
  labelCaptionCss,
  labelRequiredCss,
  applyLabelTitleStyle,
  labelNameStyle,
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
        <span css={labelNameStyle}> {label}</span>
        {renderLabelTitleRequired}
      </div>
    )
  }, [label, renderLabelTitleRequired, hasTooltip])

  const renderLabelCaption = useMemo(() => {
    return labelCaption ? <div css={labelCaptionCss}>{labelCaption}</div> : null
  }, [labelCaption])

  const formatLabelWidth = useMemo(() => {
    if (labelWidthUnit === "%" || labelWidthUnit === "px") {
      return labelWidth + labelWidthUnit
    } else {
      // wait to calc the width of the "col"
      return labelWidth + "px"
    }
  }, [labelWidthUnit, labelWidth])

  return !labelHidden && label ? (
    <label
      css={applyLabelStyle(labelPosition, labelAlign, formatLabelWidth)}
      ref={ref}
      {...rest}
    >
      {renderLabelTitle}
      {renderLabelCaption}
    </label>
  ) : null
})

export default Label
