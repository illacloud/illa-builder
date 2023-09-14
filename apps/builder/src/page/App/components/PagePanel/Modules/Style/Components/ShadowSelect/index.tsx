import { FC } from "react"
import { useTranslation } from "react-i18next"
import { DropList, DropListItem, Dropdown } from "@illa-design/react"
import { ReactComponent as ShadowIcon } from "@/assets/shadow-icon.svg"
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
    <div css={shadowSelectWrapperStyle}>
      <div css={shadowSelectStyle}>
        <div css={shadowIconHotSpotStyle}>
          <ShadowIcon />
        </div>
        <Dropdown
          trigger="click"
          position="bottom"
          autoAlignPopupWidth
          dropList={
            <DropList>
              {SHADOW_OPTIONS.map(
                (option: { label: string; value: string }) => {
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
                },
              )}
            </DropList>
          }
        >
          <span>
            {t(`editor.inspect.setter_option.shadow.${value || "small"}`)}
          </span>
        </Dropdown>
      </div>
    </div>
  )
}

ShadowSelect.displayName = "ShadowSelect"

export default ShadowSelect
