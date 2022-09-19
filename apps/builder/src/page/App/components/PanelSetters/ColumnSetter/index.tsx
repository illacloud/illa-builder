import { FC, useCallback, useEffect, useMemo } from "react"
import { OptionListHeader } from "./header"
import { ListBody } from "./body"
import { OptionListSetterProps } from "./interface"
import { ListStyle } from "./style"
import { generateNewOptionItem } from "./utils/generateNewOptions"
import { OptionListSetterProvider } from "./context/optionListContext"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { get } from "lodash"
import { ColumnDef } from "@tanstack/react-table"

export const ColumnSetter: FC<OptionListSetterProps> = (props) => {
  const {
    attrName,
    handleUpdateDsl,
    value = [],
    childrenSetter,
    widgetDisplayName,
  } = props
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
  console.log(props, data,'ColumnSetter props')

  useEffect(()=> {
    if (data.length) {
      let l: ColumnDef<object>[] = []
      if (data && data.length > 0) {
        Object.keys(data[0]).forEach((key) => {
          l.push({
            header: key,
            accessorKey: key,
          })
        })
      }
      handleUpdateDsl(attrName, l)
    }
  }, [data])

  return (
    <OptionListSetterProvider
      childrenSetter={childrenSetter}
      widgetDisplayName={widgetDisplayName}
      optionItems={value}
      attrPath={attrName}
      handleUpdateDsl={handleUpdateDsl}
    >
      <div css={ListStyle}>
        <OptionListHeader
          labelName={t("editor.inspect.setter_content.column_setter.title")}
          handleAddOption={handleAddOption}
        />
        <ListBody />
      </div>
    </OptionListSetterProvider>
  )
}

ColumnSetter.displayName = "ColumnSetter"
