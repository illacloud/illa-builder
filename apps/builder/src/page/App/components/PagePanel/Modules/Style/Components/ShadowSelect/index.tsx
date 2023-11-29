import { FC } from "react"
import { useTranslation } from "react-i18next"
import { DropList, DropListItem, Dropdown } from "@illa-design/react"
import ShadowIcon from "@/assets/shadow-icon.svg?react"
import { SHADOW_OPTIONS } from "./constants"
import { ShadowSetterProps } from "./interface"
import {
  shadowIconHotSpotStyle,
  shadowSelectStyle,
  shadowSelectWrapperStyle,
} from "./style"

const ShadowSelect: FC<ShadowSetterProps> = (props) => {
  const { value, onChange } = props

  const { t } = useTranslation()

  return (
    <Dropdown
      trigger="click"
      position="bottom-start"
      autoAlignPopupWidth
      dropList={
        <DropList>
          {SHADOW_OPTIONS.map((option) => {
            return (
              <DropListItem
                key={option.label}
                value={option.value}
                selected={value === option.value}
                colorScheme="techPurple"
                title={option.label}
                onClick={() => {
                  onChange(option.value)
                }}
              />
            )
          })}
        </DropList>
      }
    >
      <div css={shadowSelectWrapperStyle}>
        <div css={shadowSelectStyle}>
          <div css={shadowIconHotSpotStyle}>
            <ShadowIcon />
          </div>

          <div>
            {t(`editor.inspect.setter_option.shadow.${value || "small"}`)}
          </div>
        </div>
      </div>
    </Dropdown>
  )
}

ShadowSelect.displayName = "ShadowSelect"

export default ShadowSelect
