import { FC, useCallback, useEffect, useMemo, useRef } from "react"
import { ListBody } from "./body"
import { ColumnListSetterProps } from "./interface"
import { addIconStyle, columnLabelStyle, headerActionButtonStyle, ListStyle, optionListHeaderStyle } from "./style"
import { generateNewOptionItem } from "./utils/generateNewOptions"
import { ColumnsSetterProvider } from "./context/columnListContext"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { get, isEqual } from "lodash"
import { ColumnDef } from "@tanstack/react-table"
import { AddIcon } from "@illa-design/icon"
import { ColumnItemShape } from "@/widgetLibrary/TableWidget/interface"

export const ColumnSetter: FC<ColumnListSetterProps> = (props) => {
  const {
    attrName,
    handleUpdateDsl,
    value = [],
    childrenSetter,
    widgetDisplayName,
  } = props
  const isMount = useRef(false);
  const { t } = useTranslation()

  const handleAddOption = useCallback(() => {
    const num = value.length + 1
    const newItem = generateNewOptionItem(num)
    handleUpdateDsl(attrName, [...value, newItem])
  }, [value, attrName, handleUpdateDsl])


  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    rootState => {
      const executionTree = getExecutionResult(rootState)
      return get(executionTree, widgetDisplayName, {})
    },
  )

  const data = useMemo(() => {
    return get(targetComponentProps, "data", [])
  }, [targetComponentProps])


  if (!Array.isArray(childrenSetter) || childrenSetter.length === 0) {
    return null
  }

  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true;
      return;
    }
    if (data.length) {
      let l: ColumnItemShape[] = []
      if (data && data.length > 0) {
        Object.keys(data[0]).forEach((key) => {
          l.push({
            header: key,
            accessorKey: key,
            visible: true,
            enableSorting: true,
            type: "text",
          })
        })
      }
      if (!isEqual(value, l)) {
        handleUpdateDsl(attrName, l)
      }
    }
  }, [data])

  console.log(value, data, 'ColumnDef')
  return (
    <ColumnsSetterProvider
      childrenSetter={childrenSetter}
      widgetDisplayName={widgetDisplayName}
      columnItems={value}
      attrPath={attrName}
      handleUpdateDsl={handleUpdateDsl}
    >
      <div css={columnLabelStyle}>
        <div>{t("editor.inspect.setter_content.column_setter.label", {number: value.length})}</div>
        <div css={headerActionButtonStyle} onClick={handleAddOption}>
          <AddIcon _css={addIconStyle} />
          <span>{t("editor.inspect.setter_content.column_setter.new")}</span>
        </div>
      </div>
      <div css={ListStyle}>
        <div css={optionListHeaderStyle}>
          <div>{t("editor.inspect.setter_content.column_setter.title")}</div>
        </div>
        <ListBody />
      </div>
    </ColumnsSetterProvider>
  )
}

ColumnSetter.displayName = "ColumnSetter"
