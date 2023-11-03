import { FC, useMemo, useState } from "react"
import {
  DownIcon,
  SuccessIcon,
  Trigger,
  UpIcon,
  zIndex,
} from "@illa-design/react"
import { AgentTypeSelectProps } from "./interface"
import {
  optionContentStyle,
  optionItemStyle,
  optionLabelStyle,
  pointerStyle,
  valueLabelStyle,
} from "./style"

const AgentTypeSelect: FC<AgentTypeSelectProps> = (props) => {
  const { options, value, onChange } = props
  const [popupVisible, setPopupVisible] = useState<boolean>()

  const currentLabel = useMemo(() => {
    const selectedOption = options.find((option) => option.value === value)

    return selectedOption ? selectedOption.label : ""
  }, [value, options])

  const onVisibleChange = (visible: boolean) => {
    if (popupVisible !== visible) {
      setPopupVisible(visible)
    }
  }

  return (
    <Trigger
      trigger="click"
      colorScheme="white"
      position="bottom"
      zIndex={zIndex.drawer + 1}
      withoutPadding
      showArrow={false}
      popupVisible={popupVisible}
      onVisibleChange={onVisibleChange}
      content={
        <div css={[optionContentStyle]}>
          {options.map((option) => {
            return (
              <div
                css={optionItemStyle}
                key={option.label}
                onClick={() => {
                  onVisibleChange(false)
                  onChange?.(option.value)
                }}
              >
                <span css={optionLabelStyle}>{option.label}</span>
                {option.value === value && <SuccessIcon />}
              </div>
            )
          })}
        </div>
      }
    >
      <div css={[valueLabelStyle, pointerStyle]}>
        {currentLabel}
        {popupVisible ? <UpIcon /> : <DownIcon />}
      </div>
    </Trigger>
  )
}

AgentTypeSelect.displayName = "Select"

export default AgentTypeSelect
