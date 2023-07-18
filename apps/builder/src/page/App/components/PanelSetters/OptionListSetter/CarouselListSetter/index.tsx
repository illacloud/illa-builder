import { get } from "lodash"
import { FC, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { v4 } from "uuid"
import { OptionListSetterProvider } from "@/page/App/components/PanelSetters/OptionListSetter/context/optionListContext"
import { OptionListHeader } from "@/page/App/components/PanelSetters/OptionListSetter/header"
import { OptionItemShape } from "@/page/App/components/PanelSetters/OptionListSetter/interface"
import { ListStyle } from "@/page/App/components/PanelSetters/OptionListSetter/style"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { CarouselSettings } from "@/widgetLibrary/CarouselWidget/interface"
import { CAROUSEL_DEFAULT_IMAGE } from "@/widgetLibrary/CarouselWidget/widgetConfig"
import { ListBody } from "./body"
import { CarouselListSetterProps } from "./interface"

export const generateItemId = () => `Image-${v4()}`

export const generateNewImageItem = (number: number): CarouselSettings => ({
  id: generateItemId(),
  label: `Image ${number}`,
  url: CAROUSEL_DEFAULT_IMAGE,
})

const CarouselListSetter: FC<CarouselListSetterProps> = (props) => {
  const {
    attrName,
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
    return allViews.map((view) => view?.id || "")
  }, [allViews])

  const handleAddOption = useCallback(() => {
    const num = value.length + 1
    const newItem = generateNewImageItem(num)
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
      allViewsKeys={allViewsKeys}
      handleUpdateDsl={handleUpdateDsl}
      generateItemId={generateItemId}
    >
      <div css={ListStyle}>
        <OptionListHeader
          labelName={t("editor.inspect.setter_content.image_list.title")}
          handleAddOption={handleAddOption}
        />
        <ListBody />
      </div>
    </OptionListSetterProvider>
  )
}

CarouselListSetter.displayName = "CarouselListSetter"
export default CarouselListSetter
