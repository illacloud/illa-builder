import { FC } from "react"
import SearchSelectSetter from "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/searchSelect"
import { ColumnTypeSelectSetterProps } from "./interface"

const ColumnTypeSelectSetter: FC<ColumnTypeSelectSetterProps> = (props) => {
  const {
    widgetDisplayName,
    attrName,
    isSetterSingleRow,
    widgetOrAction,
    widgetType,
    expectedType,
    value,
    options,
    handleUpdateMultiAttrDSL,
    ...otherProps
  } = props

  return (
    <SearchSelectSetter
      {...otherProps}
      isSetterSingleRow={isSetterSingleRow}
      options={options}
      attrName={attrName}
      handleUpdateDsl={(attrName: string, newValue: any) => {
        const match = attrName.match(/\[([0-9]+)\]/)
        if (match) {
          const columnIndex = parseInt(match[1])
          handleUpdateMultiAttrDSL?.({
            [attrName]: newValue === "—" ? undefined : newValue,
          })
        }
      }}
      value={value}
      expectedType={expectedType}
      widgetDisplayName={widgetDisplayName}
      widgetOrAction={widgetOrAction}
      widgetType={widgetType}
      allowClear={true}
    />
  )
}

ColumnTypeSelectSetter.displayName = "ColumnTypeSelectSetter"

export default ColumnTypeSelectSetter
