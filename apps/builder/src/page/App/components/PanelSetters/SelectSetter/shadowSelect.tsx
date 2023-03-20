import { FC, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { DropList, DropListItem, Dropdown } from "@illa-design/react"
import { ReactComponent as ShadowIcon } from "@/assets/shadow-icon.svg"
import { BaseSelectSetterProps } from "@/page/App/components/PanelSetters/SelectSetter/interface"
import {
  shadowIconHotSpotStyle,
  shadowSelectStyle,
  shadowSelectWrapperStyle,
} from "@/page/App/components/PanelSetters/SelectSetter/style"

export const ShadowSelect: FC<BaseSelectSetterProps> = (props) => {
  const {
    isSetterSingleRow,
    options,
    attrName,
    handleUpdateDsl,
    value,
    allowClear,
    onChange,
  } = props

  const { t } = useTranslation()

  const dropList = useMemo(() => {
    console.log("options", options)
    return options?.map((option: { label: string; value: string }) => {
      return (
        <DropListItem
          key={option.label}
          value={option.value}
          selected={value === option.value}
          colorScheme="techPurple"
          title={option.label}
          onClick={() => {
            handleUpdateDsl(attrName, option.value)
          }}
        />
      )
    })
  }, [attrName, handleUpdateDsl, options, value])

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
          dropList={<DropList>{dropList}</DropList>}
        >
          <div style={{ width: "130px" }}>
            {t(`editor.inspect.setter_option.shadow.${value || "small"}`)}
          </div>
        </Dropdown>
      </div>
    </div>
  )
}
