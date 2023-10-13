import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { AddIcon } from "@illa-design/react"
import { ColumnListSetterProps } from "./interface"
import {
  ListStyle,
  addIconStyle,
  columnLabelStyle,
  headerActionButtonStyle,
  optionListHeaderStyle,
} from "./style"

const ColumnSetter: FC<ColumnListSetterProps> = (props) => {
  const {
    attrName,
    handleUpdateMultiAttrDSL,
    value = [],
    widgetDisplayName,
  } = props

  const { t } = useTranslation()

  const handleAddOption = useCallback(() => {}, [])

  return (
    <>
      <div css={columnLabelStyle}>
        <div>
          {t("editor.inspect.setter_content.column_setter.label", {
            number: value.length,
          })}
        </div>
        <div css={headerActionButtonStyle} onClick={handleAddOption}>
          <AddIcon css={addIconStyle} />
          <span>{t("editor.inspect.setter_content.column_setter.new")}</span>
        </div>
      </div>
      <div css={ListStyle}>
        <div css={optionListHeaderStyle}>
          <div>{t("editor.inspect.setter_content.column_setter.title")}</div>
        </div>
      </div>
    </>
  )
}

ColumnSetter.displayName = "ColumnSetter"

export default ColumnSetter
