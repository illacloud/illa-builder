import { FC, useCallback, useMemo, useState } from "react"
import {
  colorSelectMenuItemWrapperStyle,
  colorSelectMenuWrapperStyle,
  applyColorSelectPreviewColorStyle,
  colorSelectPreviewNameStyle,
  colorSelectWrapperStyle,
} from "./style"
import { Trigger } from "@illa-design/trigger"
import { ColorSelectSetterProps } from "./interface"
import chroma from "chroma-js"

export const ColorSelectSetter: FC<ColorSelectSetterProps> = (props) => {
  const { defaultValue, options, attrName, panelConfig, handleUpdateDsl } =
    props
  const [menuVisible, setMenuVisible] = useState(false)

  const renderContent = useCallback((color: string = "transparent") => {
    return (
      <>
        <div css={applyColorSelectPreviewColorStyle(color)} />
        <div css={colorSelectPreviewNameStyle}>
          {color !== "transparent"
            ? chroma(color).hex().toLocaleUpperCase()
            : color}
        </div>
      </>
    )
  }, [])

  const renderMenuList = useMemo(() => {
    return (
      <div css={colorSelectMenuWrapperStyle}>
        {options?.map((color) => {
          const { key, value } = color
          return (
            <div
              css={colorSelectMenuItemWrapperStyle}
              key={key}
              onClick={() => {
                handleUpdateDsl({ [attrName]: value })
                setMenuVisible(false)
              }}
            >
              {renderContent(key)}
            </div>
          )
        })}
      </div>
    )
  }, [renderContent, options, attrName])

  const translateValueToKey = useMemo(() => {
    const value = panelConfig[attrName]
    const key = options?.find(
      (item) => item.value === (value ?? defaultValue),
    )?.key
    return key ?? "transparent"
  }, [panelConfig, options])

  return (
    <Trigger
      colorScheme="white"
      trigger="click"
      clickOutsideToClose
      withoutPadding={true}
      popupVisible={menuVisible}
      position="bottom"
      onVisibleChange={setMenuVisible}
      content={renderMenuList}
    >
      <div css={colorSelectWrapperStyle}>
        {renderContent(translateValueToKey)}
      </div>
    </Trigger>
  )
}
