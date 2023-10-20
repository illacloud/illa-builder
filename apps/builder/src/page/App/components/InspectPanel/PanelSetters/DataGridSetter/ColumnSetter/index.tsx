import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers"
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { get, isEqual } from "lodash"
import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { v4 } from "uuid"
import { AddIcon, Button, Empty } from "@illa-design/react"
import { dealRawData2ArrayData } from "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/utils"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { DATA_GRID_COLUMN_SETTER_CONFIG } from "@/widgetLibrary/DataGridWidget/panelConfig"
import { Column } from "./components/Column"
import { ColumnConfig, ColumnListSetterProps } from "./interface"
import {
  columnLabelStyle,
  columnNumStyle,
  emptyBodyStyle,
  listStyle,
  optionListHeaderStyle,
  optionListLabelStyle,
} from "./style"

function generateCalcColumnConfig(
  key: string,
  isCalc: boolean,
  randomKey: boolean,
): ColumnConfig {
  return {
    field: randomKey ? v4() : `${key}`,
    headerName: `${key}`,
    width: 150,
    isCalc: isCalc,
    description: "",
    sortable: true,
    pinnable: true,
    filterable: true,
    hideable: true,
    aggregable: true,
    groupable: true,
    type: "actions",
    resizable: true,
    columnType: "auto",
    disableReorder: false,
    headerAlign: "left",
  }
}

const ColumnSetter: FC<ColumnListSetterProps> = (props) => {
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const calculateColumns: ColumnConfig[] = useMemo(() => {
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

    if (arrayData.length == 0) {
      return []
    } else {
      return Object.keys(arrayData[0]).map((key) => {
        return generateCalcColumnConfig(key, true, false)
      })
    }
  }, [targetComponentProps])

  const mixedColumns: ColumnConfig[] = useMemo(() => {
    const mixedColumns = [...value]
    calculateColumns.forEach((item) => {
      const index = mixedColumns.findIndex((column) => {
        return column.field === item.field
      })
      if (index >= 0) {
        mixedColumns[index] = {
          ...mixedColumns[index],
          isCalc: true,
        }
      } else {
        mixedColumns.push(item)
      }
    })
    if (!isEqual(mixedColumns, value)) {
      handleUpdateMultiAttrDSL?.({
        [attrName]: mixedColumns,
      })
    }
    return mixedColumns
  }, [attrName, calculateColumns, handleUpdateMultiAttrDSL, value])

  return (
    <>
      <div css={columnLabelStyle}>
        <div css={columnNumStyle}>
          {t("editor.inspect.setter_content.column_setter.label", {
            number: mixedColumns.length,
          })}
        </div>
        <Button
          leftIcon={<AddIcon />}
          variant="text"
          size="small"
          colorScheme="techPurple"
          onClick={() => {
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
        >
          {t("editor.inspect.setter_content.column_setter.new")}
        </Button>
      </div>
      <div css={listStyle}>
        <div css={optionListHeaderStyle}>
          <div css={optionListLabelStyle}>
            {t("editor.inspect.setter_content.column_setter.title")}
          </div>
        </div>
        {mixedColumns && mixedColumns.length > 0 ? (
          <DndContext
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
            sensors={sensors}
            collisionDetection={closestCenter}
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
          >
            <SortableContext
              items={mixedColumns.map((item) => item.field)}
              strategy={verticalListSortingStrategy}
            >
              {mixedColumns.map((config, index) => (
                <Column
                  onDelete={(id) => {
                    const finalColumns = mixedColumns.filter(
                      (item) => item.field !== id,
                    )
                    handleUpdateMultiAttrDSL?.({
                      [attrName]: finalColumns,
                    })
                  }}
                  childrenSetter={DATA_GRID_COLUMN_SETTER_CONFIG}
                  showDelete={!config.isCalc}
                  attrPath={`${attrName}.${index}`}
                  widgetDisplayName={widgetDisplayName}
                  key={config.field}
                  id={config.field}
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
              ))}
            </SortableContext>
          </DndContext>
        ) : (
          <div css={emptyBodyStyle}>
            <Empty />
          </div>
        )}
      </div>
    </>
  )
}

ColumnSetter.displayName = "ColumnSetter"

export default ColumnSetter
