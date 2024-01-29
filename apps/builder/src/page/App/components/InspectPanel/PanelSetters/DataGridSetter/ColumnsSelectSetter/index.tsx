import { get } from "lodash-es"
import { FC, useMemo } from "react"
import { useSelector } from "react-redux"
import { SelectOptionObject } from "@illa-design/react"
import { dealRawData2ArrayData } from "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/utils"
import SearchSelectSetter from "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/searchSelect"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { UNIQUE_ID_NAME } from "@/widgetLibrary/DataGridWidget/constants"
import { ColumnsSelectSetterProps } from "./interface"

const ColumnsSelectSetter: FC<ColumnsSelectSetterProps> = (props) => {
  const {
    widgetDisplayName,
    attrName,
    isSetterSingleRow,
    widgetOrAction,
    widgetType,
    expectedType,
    value,
    handleUpdateMultiAttrDSL,
    ...otherProps
  } = props

  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    (rootState) => {
      const executionTree = getExecutionResult(rootState)
      return get(executionTree, widgetDisplayName, {})
    },
  )

  const options: SelectOptionObject[] = useMemo(() => {
    const dataSourceMode = get(
      targetComponentProps,
      "dataSourceMode",
      "dynamic",
    )
    const rawData = get(
      targetComponentProps,
      dataSourceMode === "dynamic" ? "dataSourceJS" : "dataSource",
      undefined,
    )

    const arrayData: object[] = dealRawData2ArrayData(rawData)

    const opt: SelectOptionObject[] = [
      {
        value: "—",
        label: "—",
      },
    ]
    if (arrayData.length > 0) {
      Object.keys(arrayData[0]).map((key) => {
        key !== UNIQUE_ID_NAME &&
          opt.push({
            value: key,
            label: key,
          })
      })
    }
    return opt
  }, [targetComponentProps])

  return (
    <SearchSelectSetter
      {...otherProps}
      isSetterSingleRow={isSetterSingleRow}
      options={options}
      attrName={attrName}
      handleUpdateDsl={(attrName: string, newValue: any) => {
        handleUpdateMultiAttrDSL?.({
          [attrName]: newValue === "—" ? undefined : newValue,
        })
      }}
      value={value ?? "—"}
      expectedType={expectedType}
      widgetDisplayName={widgetDisplayName}
      widgetOrAction={widgetOrAction}
      widgetType={widgetType}
      allowClear={true}
    />
  )
}

ColumnsSelectSetter.displayName = "ColumnsSelectSetter"

export default ColumnsSelectSetter
