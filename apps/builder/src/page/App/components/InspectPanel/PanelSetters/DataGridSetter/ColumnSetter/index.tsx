import { arrayMove } from "@dnd-kit/sortable"
import { get } from "lodash-es"
import { FC, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { v4 } from "uuid"
import { Trigger, WarningCircleIcon, getColor } from "@illa-design/react"
import { dealRawData2ArrayData } from "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/utils"
import { ColumnContainer } from "@/page/App/components/InspectPanel/PanelSetters/DragMoveComponent/ColumnContainer"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { getColumnTypeFromValue } from "@/widgetLibrary/DataGridWidget/columnDeal"
import { UNIQUE_ID_NAME } from "@/widgetLibrary/DataGridWidget/constants"
import { getColumnsTypeSetter } from "@/widgetLibrary/DataGridWidget/panelConfig"
import { Column } from "../../DragMoveComponent/Column"
import { ColumnEmpty } from "../../DragMoveComponent/Empty"
import { BasicUpdateButton, UpdateButton } from "./Components/UpdateButton"
import { ColumnConfig, ColumnSetterProps } from "./interface"

export function generateCalcColumnConfig(
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

  const { t } = useTranslation()

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

  const arrayData: object[] = useMemo(
    () => dealRawData2ArrayData(rawData),
    [rawData],
  )

  const calculateColumnsByDataSource: ColumnConfig[] = useMemo(() => {
    if (arrayData.length == 0) {
      return []
    } else {
      return Object.keys(arrayData[0]).map((key) => {
        return generateCalcColumnConfig(key, true, false)
      })
    }
  }, [arrayData])

  const columnIDsByDataSource = useMemo(() => {
    return calculateColumnsByDataSource
      .map((item) => item.field)
      .filter((key) => key !== UNIQUE_ID_NAME)
  }, [calculateColumnsByDataSource])

  const oldColumnConfigIDs = useMemo(() => {
    return value
      .filter((item) => item.isCalc)
      .map((item) => item.field)
      .filter((key) => key !== UNIQUE_ID_NAME)
  }, [value])

  const customColumns = useMemo(() => {
    return value.filter((item) => !item.isCalc)
  }, [value])

  const removedColumnIDs: string[] = useMemo(() => {
    return oldColumnConfigIDs.filter(
      (item) => !columnIDsByDataSource.includes(item),
    )
  }, [oldColumnConfigIDs, columnIDsByDataSource])

  const addedColumnsIDs: string[] = useMemo(() => {
    return columnIDsByDataSource.filter(
      (item) => !oldColumnConfigIDs.includes(item),
    )
  }, [columnIDsByDataSource, oldColumnConfigIDs])

  const handleMixedColumns = useCallback(() => {
    if (calculateColumnsByDataSource.length === 0) {
      return value
    }
    const mixedColumnsResult: ColumnConfig[] = []

    calculateColumnsByDataSource.forEach((config) => {
      const oldConfig = value.find((item) => item.field === config.field)
      if (oldConfig) {
        mixedColumnsResult.push(oldConfig)
      } else {
        mixedColumnsResult.push(config)
      }
    })
    mixedColumnsResult.push(...customColumns)

    mixedColumnsResult.sort((a, b) => {
      const aIndex = value.findIndex((item) => item.field === a.field)
      const bIndex = value.findIndex((item) => item.field === b.field)

      if (aIndex === -1 && bIndex === -1) {
        return 0
      }
      if (aIndex === -1) {
        return 1
      }

      if (bIndex === -1) {
        return -1
      }

      return aIndex - bIndex
    })

    handleUpdateMultiAttrDSL?.({
      [attrName]: mixedColumnsResult,
    })

    return mixedColumnsResult
  }, [
    attrName,
    calculateColumnsByDataSource,
    customColumns,
    handleUpdateMultiAttrDSL,
    value,
  ])

  return (
    <ColumnContainer
      columnNum={value.length}
      onDragEnd={(event) => {
        const { active, over } = event
        if (active && over && active.id !== over.id) {
          const oldIndex = value.findIndex((item) => item.field === active.id)
          const newIndex = value.findIndex((item) => item.field === over.id)
          const finalColumns = arrayMove(value, oldIndex, newIndex)
          handleUpdateMultiAttrDSL?.({
            [attrName]: finalColumns,
          })
          return finalColumns
        }
      }}
      onClickNew={() => {
        handleUpdateMultiAttrDSL?.({
          [attrName]: [
            ...value,
            generateCalcColumnConfig(`column${value.length + 1}`, false, true),
          ],
        })
      }}
      items={value.map((item) => item.field)}
      headerExtNode={
        removedColumnIDs.length > 0 || addedColumnsIDs.length > 0 ? (
          <UpdateButton onClick={handleMixedColumns} />
        ) : (
          <BasicUpdateButton onClick={handleMixedColumns} />
        )
      }
    >
      {value.length > 0 ? (
        value.map((config, index) =>
          config.field === UNIQUE_ID_NAME ? null : (
            <Column
              labelTip={
                removedColumnIDs.length > 0 &&
                removedColumnIDs.includes(config.field) && (
                  <Trigger
                    content={t(
                      "editor.inspect.setter_tips.grid_list.no_column",
                    )}
                  >
                    <WarningCircleIcon color={getColor("orange", "03")} />
                  </Trigger>
                )
              }
              onDelete={(id) => {
                const finalColumns = value.filter((item) => item.field !== id)
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
