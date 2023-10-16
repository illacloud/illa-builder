import { AnimatePresence, Reorder } from "framer-motion"
import { get } from "lodash"
import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { AddIcon, Button, Empty } from "@illa-design/react"
import { dealRawData2ArrayData } from "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/utils"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { ColumnConfig, ColumnListSetterProps } from "./interface"
import {
  columnLabelStyle,
  columnNumStyle,
  emptyBodyStyle,
  listStyle,
  optionListHeaderStyle,
  optionListLabelStyle,
} from "./style"

function generateDefColumnConfig(key: string, isCalc: boolean): ColumnConfig {
  return {
    field: key,
    width: 150,
    resizable: false,
    isCalc: isCalc,
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
        return generateDefColumnConfig(key, true)
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
          ...item,
          isCalc: true,
        }
      } else {
        mixedColumns.push(item)
      }
    })
    return mixedColumns
  }, [calculateColumns, value])

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
                generateDefColumnConfig(
                  `column${mixedColumns.length + 1}`,
                  false,
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
          <AnimatePresence>
            <Reorder.Group
              axis="y"
              values={mixedColumns}
              onReorder={(newOrder) => {
                handleUpdateMultiAttrDSL?.({
                  [attrName]: [...newOrder],
                })
              }}
            >
              {mixedColumns.map((item) => {
                return (
                  <Reorder.Item key={item.field} id={item.field} value={item}>
                    {item.field}
                  </Reorder.Item>
                )
              })}
            </Reorder.Group>
          </AnimatePresence>
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
