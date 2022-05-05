import { FC, useMemo } from "react"
import ILabelProps from "./interface"
import {
  applyLabelStyle,
  labelCaptionCss,
  labelRequiredCss,
  labelTitleCss,
} from "./styles"

const Label: FC<ILabelProps> = (props) => {
  const {
    label = "Label",
    labelAlign = "left",
    labelCaption,
    labelPosition = "left",
    labelWidth = 33,
    labelWidthUnit = "%",
    required = false,
    hidden = false,
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

  const renderLabel = useMemo(() => {
    return !hidden && label ? (
      <label css={applyLabelStyle(labelPosition, labelAlign, formatLabelWidth)}>
        {renderLabelTitle}
        {renderLabelCaption}
      </label>
    ) : null
  }, [
    hidden,
    label,
    labelPosition,
    labelAlign,
    formatLabelWidth,
    renderLabelTitle,
    renderLabelCaption,
  ])

  return renderLabel
}

export default Label
