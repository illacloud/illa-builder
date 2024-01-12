import { isString } from "lodash-es"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Select } from "@illa-design/react"
import { PanelLabel } from "@/page/App/components/InspectPanel/components/Label"
import { MeasureSelectSetterProps } from "./interface"
import { containerStyle, setterContainerStyle } from "./style"

const MeasureSelectSetter: FC<MeasureSelectSetterProps> = (props) => {
  const {
    attrName,
    handleUpdateMultiAttrDSL,
    value,
    defaultValue,
    labelName,
    useCustomLayout,
    options,
  } = props

  const { t } = useTranslation()

  return (
    <div css={containerStyle}>
      <div css={setterContainerStyle}>
        <PanelLabel
          labelName={labelName}
          labelSize={useCustomLayout ? "small" : "medium"}
        />
        <Select
          defaultValue={defaultValue}
          onChange={(value) => {
            handleUpdateMultiAttrDSL?.({
              [attrName]: value,
            })
          }}
          value={value}
          dropdownProps={{
            position: "top",
          }}
          w={useCustomLayout ? "170px" : "182px"}
          colorScheme="techPurple"
          options={options?.map((i) => {
            return {
              label: isString(i.label) ? t(i.label) : i.value,
              value: i.value,
            }
          })}
        />
      </div>
    </div>
  )
}

MeasureSelectSetter.displayName = "CustomBgSelect"

export default MeasureSelectSetter
