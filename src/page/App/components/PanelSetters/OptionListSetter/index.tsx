import { FC, useCallback } from "react"
import { OptionListHeader } from "./header"
import { ListBody } from "./body"
import { OptionListSetterProps } from "./interface"
import { ListStyle } from "./style"
import { generateNewOptionItem } from "@/page/App/components/PanelSetters/OptionListSetter/utils/generateNewOptions"
import { OptionListSetterProvider } from "@/page/App/components/PanelSetters/OptionListSetter/context/optionListContext"

export const OptionListSetter: FC<OptionListSetterProps> = (props) => {
  const {
    attrName,
    handleUpdateDsl,
    value = [],
    childrenSetter,
    widgetDisplayName,
  } = props

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
    >
      <div css={ListStyle}>
        <OptionListHeader
          labelName="Options"
          handleAddOption={handleAddOption}
        />
        <ListBody />
      </div>
    </OptionListSetterProvider>
  )
}

OptionListSetter.displayName = "OptionListSetter"
