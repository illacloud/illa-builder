import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { Select, SelectValue } from "@illa-design/react"
import { PanelLabel } from "@/page/App/components/InspectPanel/components/Label"
import ColorPickerSetter from "../../ColorPickerSetter"
import { ShadowSelectProps } from "./interface"
import { containerStyle, setterContainerStyle } from "./style"

enum CUSTOM_BG_SELECT_OPTIONS {
  AUTO = "auto",
  CUSTOM = "custom",
}

const CustomBgSelect: FC<ShadowSelectProps> = (props) => {
  const {
    attrName,
    handleUpdateMultiAttrDSL,
    value,
    labelName,
    useCustomLayout,
  } = props

  const { t } = useTranslation()

  const options = [
    {
      label: t("editor.inspect.setter_group.custom_bg.options.auto"),
      value: CUSTOM_BG_SELECT_OPTIONS.AUTO,
    },
    {
      label: t("editor.inspect.setter_group.custom_bg.options.custom"),
      value: CUSTOM_BG_SELECT_OPTIONS.CUSTOM,
    },
  ]

  const [selectValue, setSelectValue] = useState<SelectValue | undefined>(
    value ? CUSTOM_BG_SELECT_OPTIONS.CUSTOM : CUSTOM_BG_SELECT_OPTIONS.AUTO,
  )

  const handleUpdateSelectState = (value: SelectValue | undefined) => {
    setSelectValue(value)
    if (value === CUSTOM_BG_SELECT_OPTIONS.AUTO) {
      handleUpdateMultiAttrDSL?.({
        [attrName]: undefined,
      })
    }
  }

  return (
    <div css={containerStyle}>
      <div css={setterContainerStyle}>
        <PanelLabel
          labelName={labelName}
          labelSize={useCustomLayout ? "small" : "medium"}
        />
        <Select
          onChange={handleUpdateSelectState}
          value={selectValue}
          dropdownProps={{
            position: "top",
          }}
          w={useCustomLayout ? "170px" : "182px"}
          colorScheme="techPurple"
          options={options}
        />
      </div>
      {selectValue === "custom" && (
        <ColorPickerSetter
          labelName={t("editor.inspect.setter_group.color")}
          labelSize={useCustomLayout ? "small" : "medium"}
          value={value}
          defaultValue="blue"
          attrName={attrName}
          handleUpdateMultiAttrDSL={handleUpdateMultiAttrDSL}
        />
      )}
    </div>
  )
}

CustomBgSelect.displayName = "CustomBgSelect"

export default CustomBgSelect
