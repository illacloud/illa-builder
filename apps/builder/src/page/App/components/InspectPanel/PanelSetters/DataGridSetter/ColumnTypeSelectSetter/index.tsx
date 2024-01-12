import { get } from "lodash-es"
import { FC } from "react"
import SearchSelectSetter from "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/searchSelect"
import { ColumnTypeSelectSetterProps } from "./interface"

const ColumnTypeSelectSetter: FC<ColumnTypeSelectSetterProps> = (props) => {
  const {
    widgetDisplayName,
    componentNode,
    attrName,
    parentAttrName,
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
        if (match && parentAttrName) {
          const currentColumn = get(componentNode?.props, parentAttrName)
          const columns = get(componentNode?.props, "columns")
          const newColumns = [...columns]
          newColumns[parseInt(match[1])] = {
            field: currentColumn.field,
            headerName: currentColumn.headerName,
            width: currentColumn.width,
            isCalc: currentColumn.isCalc,
            description: currentColumn.description,
            sortable: currentColumn.sortable,
            pinnable: currentColumn.pinnable,
            filterable: currentColumn.filterable,
            hideable: currentColumn.hideable,
            aggregable: currentColumn.aggregable,
            groupable: currentColumn.groupable,
            resizable: currentColumn.resizable,
            columnType: newValue,
            disableReorder: currentColumn.disableReorder,
            headerAlign: currentColumn.headerAlign,
          }
          handleUpdateMultiAttrDSL?.({
            columns: newColumns,
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
