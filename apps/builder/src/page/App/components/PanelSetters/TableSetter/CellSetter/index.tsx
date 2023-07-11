import { FC, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { AddIcon } from "@illa-design/react"
import { ListBody } from "./body"
import { ColumnsSetterProvider } from "./context/columnListContext"
import { CellSetterProps } from "./interface"
import {
  ListStyle,
  addIconStyle,
  columnLabelStyle,
  headerActionButtonStyle,
} from "./style"
import {
  generateNewButtonCellContent,
  generateNewIconCellContent,
} from "./utils/generateNewColumns"

const CellSetter: FC<CellSetterProps> = (props) => {
  const {
    attrName,
    handleUpdateDsl,
    value = [],
    childrenSetter,
    widgetDisplayName,
  } = props

  const { t } = useTranslation()

  const realAttrName = useMemo(() => attrName?.split(".")?.pop(), [attrName])

  const handleAddOption = useCallback(() => {
    const num = value.length + 1
    if (realAttrName === "buttonGroupContent") {
      const newItem = generateNewButtonCellContent(num)
      handleUpdateDsl(attrName, [...value, newItem])
    } else if (realAttrName === "iconGroupContent") {
      const newItem = generateNewIconCellContent(num)
      handleUpdateDsl(attrName, [...value, newItem])
    }
  }, [value, attrName, handleUpdateDsl, realAttrName])

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
        <ListBody />
      </div>
    </ColumnsSetterProvider>
  )
}

CellSetter.displayName = "CellSetter"

export default CellSetter
