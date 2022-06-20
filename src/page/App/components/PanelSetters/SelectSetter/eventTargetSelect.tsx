import { FC, useContext } from "react"
import { Select } from "@illa-design/select"
import { BaseSelectSetterProps } from "./interface"
import { GLOBAL_DATA_CONTEXT } from "@/page/App/context/globalDataProvider"
import { applyBaseSelectWrapperStyle } from "@/page/App/components/PanelSetters/SelectSetter/style"

export const EventTargetSelect: FC<BaseSelectSetterProps> = (props) => {
  const { globalData } = useContext(GLOBAL_DATA_CONTEXT)

  const {
    isSetterSingleRow,
    options,
    defaultValue,
    attrName,
    panelConfig,
    handleUpdateDsl,
  } = props

  const finalOptions = () => {
    const tmpOptions: { label: string; value: string }[] = []
    Object.keys(globalData).forEach((key) => {
      if ("type" in globalData[key]) {
        if (globalData[key].type === "widget") {
          tmpOptions.push({
            label: key,
            value: key,
          })
        }
      }
    })
    return tmpOptions
  }

  return (
    <div css={applyBaseSelectWrapperStyle(isSetterSingleRow)}>
      <Select
        options={finalOptions()}
        size="small"
        value={panelConfig[attrName] ?? defaultValue}
        onChange={(value) => {
          handleUpdateDsl({ [attrName]: value })
        }}
      />
    </div>
  )
}
