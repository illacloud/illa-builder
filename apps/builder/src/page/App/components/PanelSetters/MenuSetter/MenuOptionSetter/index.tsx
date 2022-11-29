import { ListBody } from "./body"
import { MenusSetterProvider } from "./context/menuListContext"
import { ColumnListSetterProps } from "./interface"
import {
  addIconStyle,
  columnLabelStyle,
  headerActionButtonStyle,
  ListStyle,
  optionListHeaderStyle,
} from "./style"
import { generateNewMenuItem } from "./utils/generateNewMenu"
import { AddIcon } from "@illa-design/react"
import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"

export const MenuOptionSetter: FC<ColumnListSetterProps> = (props) => {
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
    const newItem = generateNewMenuItem(num)
    handleUpdateDsl(attrName, [...value, newItem])
  }, [value, attrName, handleUpdateDsl])

  if (!Array.isArray(childrenSetter) || childrenSetter.length === 0) {
    return null
  }

  return (
    <MenusSetterProvider
      childrenSetter={childrenSetter}
      widgetDisplayName={widgetDisplayName}
      columnItems={value}
      attrPath={attrName}
      handleUpdateDsl={handleUpdateDsl}
    >
      <div css={ListStyle}>
        <div css={optionListHeaderStyle}>
          <div>
            {t("editor.inspect.setter_content.menu_setter.label", {
              number: value.length,
            })}
          </div>
          <div css={headerActionButtonStyle} onClick={handleAddOption}>
            <AddIcon _css={addIconStyle} />
            <span>{t("editor.inspect.setter_content.column_setter.new")}</span>
          </div>
        </div>
        <ListBody />
      </div>
    </MenusSetterProvider>
  )
}

MenuOptionSetter.displayName = "MenuOptionSetter"
