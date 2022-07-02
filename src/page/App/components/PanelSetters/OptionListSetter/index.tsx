import { FC, useCallback } from "react"
import { OptionListHeader } from "./header"
import { ListBody } from "./body"
import { OptionListSetterProps } from "./interface"
import { ListCss } from "./style"
import {
  generateNewOptionItem,
  generateOptionItemId,
} from "@/page/App/components/PanelSetters/OptionListSetter/utils/generateNewOptions"
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

  const handleDeleteOptionItem = useCallback(
    (index: number) => {
      const updatedArray = value.filter(
        (optionItem: Record<string, any>, i: number) => {
          return i !== index
        },
      )
      handleUpdateDsl(attrName, updatedArray)
    },
    [value, handleUpdateDsl, attrName],
  )

  const handleCopyOptionItem = useCallback(
    (index: number) => {
      let targetOptionItem = value.find(
        (optionItem: Record<string, any>, i: number) => {
          return i === index
        },
      )
      if (!targetOptionItem) return
      targetOptionItem = {
        ...targetOptionItem,
        id: generateOptionItemId(),
      }
      const updatedArray = [...value, targetOptionItem]
      handleUpdateDsl(attrName, updatedArray)
    },
    [value, handleUpdateDsl, attrName],
  )

  const handleMoveOptionItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragOptionItem = value[dragIndex]
      const newOptions = [...value]
      newOptions.splice(dragIndex, 1)
      newOptions.splice(hoverIndex, 0, dragOptionItem)
      handleUpdateDsl(attrName, newOptions)
    },
    [attrName, value, handleUpdateDsl],
  )

  if (!Array.isArray(childrenSetter) || childrenSetter.length === 0) {
    return null
  }

  return (
    <OptionListSetterProvider
      childrenSetter={childrenSetter}
      widgetDisplayName={widgetDisplayName}
      optionItems={value}
      handleMoveOptionItem={handleMoveOptionItem}
      handleCopyOptionItem={handleCopyOptionItem}
      handleDeleteOptionItem={handleDeleteOptionItem}
      attrPath={attrName}
    >
      <div css={ListCss}>
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
