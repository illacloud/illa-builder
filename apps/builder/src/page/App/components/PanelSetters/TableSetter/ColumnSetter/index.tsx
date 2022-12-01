import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { AddIcon } from "@illa-design/react"
import { ListBody } from "./body"
import { ColumnsSetterProvider } from "./context/columnListContext"
import { ColumnListSetterProps } from "./interface"
import {
  ListStyle,
  addIconStyle,
  columnLabelStyle,
  headerActionButtonStyle,
  optionListHeaderStyle,
} from "./style"
import { generateNewColumnItem } from "./utils/generateNewColumns"

export const ColumnSetter: FC<ColumnListSetterProps> = (props) => {
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
    const newItem = generateNewColumnItem(num)
    handleUpdateDsl(attrName, [...value, newItem])
  }, [value, attrName, handleUpdateDsl])

  if (!Array.isArray(childrenSetter) || childrenSetter.length === 0) {
    return null
  }

  return (
    <ColumnsSetterProvider
      childrenSetter={childrenSetter}
      widgetDisplayName={widgetDisplayName}
      columnItems={value}
      attrPath={attrName}
      handleUpdateDsl={handleUpdateDsl}
    >
      <div css={columnLabelStyle}>
        <div>
          {t("editor.inspect.setter_content.column_setter.label", {
            number: value.length,
          })}
        </div>
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
