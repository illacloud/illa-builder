import { FC, useContext } from "react"
import { Select } from "@illa-design/select"
import { applySetterStyle } from "@/page/App/components/PanelSetters/style"
import { BaseSelectSetterProps } from "./interface"
import { GLOBAL_DATA_CONTEXT } from "@/page/App/context/globalDataProvider"

export const EventTargetSelect: FC<BaseSelectSetterProps> = (props) => {
  const { globalData } = useContext(GLOBAL_DATA_CONTEXT)

  const {
    isFullWidth,
    options,
    defaultValue,
    attrName,
    panelConfig,
    handleUpdateDsl,
    handleUpdatePanelConfig,
  } = props

  console.log("props", props)

  const finalOptions = () => {
    const tmpOptions: { label: string; value: string }[] = []
    console.log("globalData", globalData)
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
    <div css={applySetterStyle(isFullWidth)}>
      <Select
        options={finalOptions()}
        size="small"
        value={panelConfig[attrName] ?? defaultValue}
        onChange={(value) => {
          handleUpdatePanelConfig({ [attrName]: value })
          handleUpdateDsl({ [attrName]: value })
        }}
      />
    </div>
  )
}
