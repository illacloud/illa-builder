import { get } from "lodash"
import { FC, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { OptionListSetterProvider } from "@/page/App/components/PanelSetters/OptionListSetter/context/optionListContext"
import {
  generateNewOptionItem,
  generateOptionItemId,
} from "@/page/App/components/PanelSetters/OptionListSetter/utils/generateNewOptions"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { ListBody } from "./body"
import { OptionListHeader } from "./header"
import { OptionItemShape, OptionListSetterProps } from "./interface"
import { ListStyle } from "./style"

const OptionListSetter: FC<OptionListSetterProps> = (props) => {
  const {
    attrName,
    headerName,
    itemName,
    emptyNode,
    handleUpdateDsl,
    value = [],
    childrenSetter,
    widgetDisplayName,
  } = props
  const { t } = useTranslation()
  const executionResult = useSelector(getExecutionResult)

  const allViews = useMemo(() => {
    return get(
      executionResult,
      `${widgetDisplayName}.${attrName}`,
      [],
    ) as OptionItemShape[]
  }, [attrName, executionResult, widgetDisplayName])

  const allViewsKeys = useMemo(() => {
    return allViews.map((view) => view?.value || "")
  }, [allViews])

  const handleAddOption = useCallback(() => {
    const newItem = generateNewOptionItem(allViewsKeys, itemName)
    handleUpdateDsl(attrName, [...value, newItem])
  }, [allViewsKeys, itemName, handleUpdateDsl, attrName, value])

  if (!Array.isArray(childrenSetter) || childrenSetter.length === 0) {
    return null
  }

  return (
    <OptionListSetterProvider
      childrenSetter={childrenSetter}
      widgetDisplayName={widgetDisplayName}
      optionItems={value}
      itemName={itemName}
      attrPath={attrName}
      allViewsKeys={allViewsKeys}
      handleUpdateDsl={handleUpdateDsl}
      generateItemId={generateOptionItemId}
    >
      <div css={ListStyle}>
        <OptionListHeader
          labelName={
            headerName ?? t("editor.inspect.setter_content.option_list.title")
          }
          handleAddOption={handleAddOption}
        />
        <ListBody emptyNode={emptyNode} />
      </div>
    </OptionListSetterProvider>
  )
}

OptionListSetter.displayName = "OptionListSetter"
export default OptionListSetter
