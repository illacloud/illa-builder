import { FC } from "react"
import { Select } from "@illa-design/react"
import {
  applyBaseSelectWrapperStyle,
  setterContainerStyle,
} from "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/style"
import { PanelLabel } from "@/page/App/components/InspectPanel/components/Label"
import { BaseSelectSetterProps } from "./interface"

const BaseSelectSetter: FC<BaseSelectSetterProps> = (props) => {
  const {
    isSetterSingleRow,
    options,
    attrName,
    handleUpdateDsl,
    value,
    allowClear,
    defaultValue,
    onChange,
    showSearch,
    labelName,
    labelDesc,
    labelSize,
  } = props

  return (
    <div css={setterContainerStyle(isSetterSingleRow)}>
      <span>
        {labelName && (
          <PanelLabel
            labelName={labelName}
            labelDesc={labelDesc}
            labelSize={labelSize}
          />
        )}
      </span>
      <div css={applyBaseSelectWrapperStyle(isSetterSingleRow)}>
        <Select
          options={options}
          size="medium"
          defaultValue={defaultValue}
          value={value}
          colorScheme="techPurple"
          onChange={(value) => {
            handleUpdateDsl(attrName, value)
            onChange?.(value)
          }}
          allowClear={allowClear}
          showSearch={showSearch}
        />
      </div>
    </div>
  )
}

BaseSelectSetter.displayName = "BaseSelect"

export default BaseSelectSetter
