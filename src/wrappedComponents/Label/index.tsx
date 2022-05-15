import { useMemo, forwardRef } from "react"
import LabelProps from "./interface"
import {
  applyLabelStyle,
  labelCaptionCss,
  labelRequiredCss,
  labelTitleCss,
} from "./styles"

const Label = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const {
    label,
    labelAlign = "left",
    labelCaption,
    labelPosition = "left",
    labelWidth = 33,
    labelWidthUnit = "%",
    required,
    hidden,
  } = props

  const renderLabelTitleRequired = useMemo(() => {
    return required ? <span css={labelRequiredCss}>*</span> : null
  }, [])

  const renderLabelTitle = useMemo(() => {
    return (
      <span css={labelTitleCss}>
        {label}
        {renderLabelTitleRequired}
      </span>
    )
  }, [label, renderLabelTitleRequired])

  const renderLabelCaption = useMemo(() => {
    return labelCaption ? <div css={labelCaptionCss}>{labelCaption}</div> : null
  }, [])

  const formatLabelWidth = useMemo(() => {
    if (labelWidthUnit === "%" || labelWidthUnit === "px") {
      return labelWidth + labelWidthUnit
    } else {
      // wait to calc the width of the "col"
      return labelWidth + "px"
    }
  }, [labelWidthUnit, labelWidth])

  return !hidden && label ? (
    <label
      css={applyLabelStyle(labelPosition, labelAlign, formatLabelWidth)}
      ref={ref}
    >
      {renderLabelTitle}
      {renderLabelCaption}
    </label>
  ) : null
})

export default Label
