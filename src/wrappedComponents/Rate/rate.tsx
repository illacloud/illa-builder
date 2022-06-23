import { forwardRef, useMemo } from "react"
import { Rate } from "@illa-design/rate"
import { Wrapper } from "@/wrappedComponents/Wrapper"
import { TooltipWrapper } from "@/wrappedComponents/TooltipWrapper"
import { InvalidMessage } from "@/wrappedComponents/InvalidMessage"
import { invalidMessage } from "@/wrappedComponents/InvalidMessage/utils"
import LabelWrapper from "@/wrappedComponents/LabelWrapper"
import { WrappedRateProps } from "./interface"
import { inputContainerCss } from "./style"

export const WrappedRate = forwardRef<any, WrappedRateProps>((props, ref) => {
  const {
    value,
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
    icon,
    readOnly,
    allowHalf,
    hideValidationMessage,
    maxCount,
    handleUpdateDsl,
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
              heart={icon === "heart"}
              disabled={disabled}
              readonly={readOnly}
              allowClear={allowClear}
              value={value}
              onChange={(value) => {
                handleUpdateDsl({ value })
              }}
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
})

WrappedRate.displayName = "WrappedRate"

export const RateWidget = WrappedRate
