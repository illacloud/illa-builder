import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { Select, SelectValue } from "@illa-design/react"
import { PanelLabel } from "@/page/App/components/InspectPanel/components/Label"
import ColorPickerSetter from "../../ColorPickerSetter"
import { ShadowSelectProps } from "./interface"
import { setterContainerStyle } from "./style"

enum CUSTOM_BG_SELECT_OPTIONS {
  AUTO = "auto",
  CUSTOM = "custom",
}

const CustomBgSelect: FC<ShadowSelectProps> = (props) => {
  const { attrName, handleUpdateMultiAttrDSL, value, labelName } = props

  const { t } = useTranslation()

  const options = [
    {
      label: t("auto"),
      value: CUSTOM_BG_SELECT_OPTIONS.AUTO,
    },
    {
      label: t("custom"),
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
    <div>
      <div css={setterContainerStyle}>
        <PanelLabel labelName={labelName} labelSize="small" />
        <Select
          onChange={handleUpdateSelectState}
          value={selectValue}
          w="170px"
          colorScheme="techPurple"
          options={options}
        />
      </div>
      {selectValue === "custom" && (
        <ColorPickerSetter
          labelName={t("editor.inspect.setter_group.color")}
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
