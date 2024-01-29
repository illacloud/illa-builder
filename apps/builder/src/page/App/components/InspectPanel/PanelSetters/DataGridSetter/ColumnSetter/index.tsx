import { arrayMove } from "@dnd-kit/sortable"
import { get, isEqual } from "lodash-es"
import { FC, useMemo } from "react"
import { useSelector } from "react-redux"
import { v4 } from "uuid"
import { dealRawData2ArrayData } from "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/utils"
import { ColumnContainer } from "@/page/App/components/InspectPanel/PanelSetters/DragMoveComponent/ColumnContainer"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { getColumnTypeFromValue } from "@/widgetLibrary/DataGridWidget/columnDeal"
import { UNIQUE_ID_NAME } from "@/widgetLibrary/DataGridWidget/constants"
import { getColumnsTypeSetter } from "@/widgetLibrary/DataGridWidget/panelConfig"
import { Column } from "../../DragMoveComponent/Column"
import { ColumnEmpty } from "../../DragMoveComponent/Empty"
import { ColumnConfig, ColumnSetterProps } from "./interface"

function generateCalcColumnConfig(
  key: string,
  isCalc: boolean,
  randomKey: boolean,
): ColumnConfig {
  let field
  if (key === UNIQUE_ID_NAME) {
    field = UNIQUE_ID_NAME
  } else if (randomKey) {
    field = v4()
  } else {
    field = `${key}`
  }
  return {
    field,
    headerName: `${key}`,
    width: 170,
    isCalc: isCalc,
    description: "",
    sortable: true,
    pinnable: true,
    filterable: true,
    hideable: true,
    aggregable: true,
    groupable: true,
    resizable: true,
    columnType: "auto",
    disableReorder: false,
    headerAlign: "left",
  }
}

const ColumnSetter: FC<ColumnSetterProps> = (props) => {
  const {
    attrName,
    handleUpdateMultiAttrDSL,
    value = [],
    widgetDisplayName,
  } = props

  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    (rootState) => {
      const executionTree = getExecutionResult(rootState)
      return get(executionTree, widgetDisplayName, {})
    },
  )

  const columnVisibilityModel = get(
    targetComponentProps,
    "columnVisibilityModel",
    undefined,
  )

  const dataSourceMode = get(targetComponentProps, "dataSourceMode", "dynamic")

  const rawData = get(
    targetComponentProps,
    dataSourceMode === "dynamic" ? "dataSourceJS" : "dataSource",
    undefined,
  )

  const arrayData: object[] = dealRawData2ArrayData(rawData)

  const calculateColumns: ColumnConfig[] = useMemo(() => {
    if (arrayData.length == 0) {
      return []
    } else {
      return Object.keys(arrayData[0]).map((key) => {
        return generateCalcColumnConfig(key, true, false)
      })
    }
  }, [arrayData])

  const mixedColumns: ColumnConfig[] = useMemo(() => {
    if (calculateColumns.length === 0) {
      return value
    }
    const mixedColumns: ColumnConfig[] = []

    value.forEach((config) => {
      const index = calculateColumns.findIndex(
        (item) => item.field === config.field,
      )
      if (index !== -1) {
        calculateColumns.splice(index, 1)
        mixedColumns.push(config)
      } else {
        if (!config.isCalc) {
          mixedColumns.push(config)
        }
      }
    })
    calculateColumns.forEach((config) => {
      mixedColumns.push(config)
    })
    if (!isEqual(mixedColumns, value)) {
      handleUpdateMultiAttrDSL?.({
        [attrName]: mixedColumns,
      })
    }
    return mixedColumns
  }, [attrName, calculateColumns, handleUpdateMultiAttrDSL, value])

  return (
    <ColumnContainer
      columnNum={mixedColumns.length}
      onDragEnd={(event) => {
        const { active, over } = event
        if (active && over && active.id !== over.id) {
          const oldIndex = mixedColumns.findIndex(
            (item) => item.field === active.id,
          )
          const newIndex = mixedColumns.findIndex(
            (item) => item.field === over.id,
          )
          const finalColumns = arrayMove(mixedColumns, oldIndex, newIndex)
          handleUpdateMultiAttrDSL?.({
            [attrName]: finalColumns,
          })
          return finalColumns
        }
      }}
      onClickNew={() => {
        handleUpdateMultiAttrDSL?.({
          [attrName]: [
            ...mixedColumns,
            generateCalcColumnConfig(
              `column${mixedColumns.length + 1}`,
              false,
              true,
            ),
          ],
        })
      }}
      items={mixedColumns.map((item) => item.field)}
    >
      {mixedColumns.length > 0 ? (
        mixedColumns.map((config, index) =>
          config.field === UNIQUE_ID_NAME ? null : (
            <Column
              onDelete={(id) => {
                const finalColumns = mixedColumns.filter(
                  (item) => item.field !== id,
                )
                handleUpdateMultiAttrDSL?.({
                  [attrName]: finalColumns,
                })
              }}
              childrenSetter={getColumnsTypeSetter(
                config.columnType,
                getColumnTypeFromValue(get(arrayData[0], config.field)),
              )}
              showDelete={!config.isCalc}
              attrPath={`${attrName}.${index}`}
              widgetDisplayName={widgetDisplayName}
              key={config.field}
              id={config.field}
              showVisible={true}
              label={config.headerName ?? config.field}
              visibility={columnVisibilityModel?.[config.field] ?? true}
              onVisibilityChange={(visibility) => {
                handleUpdateMultiAttrDSL?.({
                  ["columnVisibilityModel"]: {
                    ...columnVisibilityModel,
                    [config.field]: visibility,
                  },
                })
              }}
            />
          ),
        )
      ) : (
        <ColumnEmpty />
      )}
    </ColumnContainer>
  )
}

ColumnSetter.displayName = "ColumnSetter"

export default ColumnSetter
