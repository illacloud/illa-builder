import { FC, useMemo } from "react"
import { WrappedDateProps } from "./interface"
import { Wrapper } from "@/wrappedComponents/Wrapper"
import { withParser } from "@/wrappedComponents/parserHOC"
import { TooltipWrapper } from "@/wrappedComponents/TooltipWrapper"
import LabelWrapper from "../LabelWrapper"
import { InvalidMessage } from "@/wrappedComponents/InvalidMessage"
import { inputContainerCss } from "./style"
import { Rate } from "@illa-design/rate"
import { invalidMessage } from "@/wrappedComponents/InvalidMessage/utils"

export const WrappedRate: FC<WrappedDateProps> = (props) => {
  const {
    value,
    defaultValue,
    tooltipText,
    allowClear,
    label,
    labelAlign,
    labelWidth,
    labelPosition,
    labelCaption,
    labelWidthUnit,
    required,
    disabled,
    customRule,
    heart,
    readOnly,
    allowHalf,
    hideValidationMessage,
    maxCount,
  } = props

  const _customValue = useMemo(() => {
    if (customRule) {
      return customRule
    } else if (required && !value) {
      return invalidMessage.get("required")
    }
  }, [customRule, required, value])

  return (
    <TooltipWrapper
      tooltipText={tooltipText}
      disabled={!tooltipText}
      position="tl"
    >
      <Wrapper alignment="fullWidth">
        <LabelWrapper
          label={label}
          labelAlign={labelAlign}
          labelWidth={labelWidth}
          labelCaption={labelCaption}
          labelWidthUnit={labelWidthUnit}
          labelPosition={labelPosition}
          required={required}
          tooltipText={tooltipText}
        >
          <div css={inputContainerCss}>
            <Rate
              count={maxCount}
              allowHalf={allowHalf}
              heart={heart}
              disabled={disabled}
              readonly={readOnly}
              allowClear={allowClear}
              value={value ?? defaultValue}
            />
            <InvalidMessage
              customRule={_customValue}
              hideValidationMessage={hideValidationMessage}
            />
          </div>
        </LabelWrapper>
      </Wrapper>
    </TooltipWrapper>
  )
}

WrappedRate.displayName = "WrappedRate"

export const RateWidget = withParser(WrappedRate)
