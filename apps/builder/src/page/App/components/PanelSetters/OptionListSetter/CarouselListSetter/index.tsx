import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { v4 } from "uuid"
import { OptionListSetterProvider } from "@/page/App/components/PanelSetters/OptionListSetter/context/optionListContext"
import { OptionListHeader } from "@/page/App/components/PanelSetters/OptionListSetter/header"
import { ListStyle } from "@/page/App/components/PanelSetters/OptionListSetter/style"
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

export const CarouselListSetter: FC<CarouselListSetterProps> = (props) => {
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
