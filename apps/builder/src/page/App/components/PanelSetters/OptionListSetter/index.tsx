import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { OptionListSetterProvider } from "@/page/App/components/PanelSetters/OptionListSetter/context/optionListContext"
import {
  generateNewOptionItem,
  generateOptionItemId,
} from "@/page/App/components/PanelSetters/OptionListSetter/utils/generateNewOptions"
import { ListBody } from "./body"
import { OptionListHeader } from "./header"
import { OptionListSetterProps } from "./interface"
import { ListStyle } from "./style"

export const OptionListSetter: FC<OptionListSetterProps> = (props) => {
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

  if (!Array.isArray(childrenSetter) || childrenSetter.length === 0) {
    return null
  }

  return (
    <OptionListSetterProvider
      childrenSetter={childrenSetter}
      widgetDisplayName={widgetDisplayName}
      optionItems={value}
      attrPath={attrName}
      handleUpdateDsl={handleUpdateDsl}
      generateItemId={generateOptionItemId}
    >
      <div css={ListStyle}>
        <OptionListHeader
          labelName={t("editor.inspect.setter_content.option_list.title")}
          handleAddOption={handleAddOption}
        />
        <ListBody />
      </div>
    </OptionListSetterProvider>
  )
}

OptionListSetter.displayName = "OptionListSetter"
