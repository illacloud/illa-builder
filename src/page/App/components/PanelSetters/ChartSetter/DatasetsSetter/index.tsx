import { FC, useCallback, useMemo } from "react"
import { DatasetSetterHeader } from "./header"
import { ListBody } from "./body"
import { DatasetSetterProps } from "./interface"
import { ListCss } from "./style"
import { DatasetContextSetterProvider } from "./context/datasetsListContext"
import { generateNewDatasetItem } from "@/page/App/components/PanelSetters/ChartSetter/utils"

export const DatasetsSetter: FC<DatasetSetterProps> = (props) => {
  const {
    attrName,
    handleUpdateDsl,
    widgetDisplayName,
    childrenSetter,
    panelConfig,
    value = [],
  } = props

  if (!Array.isArray(childrenSetter) || childrenSetter.length === 0) {
    return null
  }

  const maxValue = useMemo(() => {
    let max = Number.MIN_VALUE
    if (value && value.length > 0) {
      value.forEach((v) => {
        if (v.values) {
          max = Math.max(max, Math.max(...v.values))
        }
      })
    }
    return max
  }, [value])

  const handleAddOption = useCallback(() => {
    const num = value.length + 1
    const newItem = generateNewDatasetItem(num, 4, maxValue)
    handleUpdateDsl(attrName, [...value, newItem])
  }, [value, attrName, handleUpdateDsl])

  return (
    <DatasetContextSetterProvider
      childrenSetter={childrenSetter}
      widgetDisplayName={widgetDisplayName}
      optionItems={value}
      attrPath={attrName}
      handleUpdateDsl={handleUpdateDsl}
    >
      <DatasetSetterHeader labelName="label" handleAddItem={handleAddOption} />
      <div css={ListCss}>
        <ListBody />
      </div>
    </DatasetContextSetterProvider>
  )
}

DatasetsSetter.displayName = "OptionListSetter"
