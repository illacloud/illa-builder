import { FC, useCallback, useMemo, useState } from "react"
import {
  colorSelectMenuItemWrapperCss,
  colorSelectMenuWrapperCss,
  colorSelectPreviewColorCss,
  colorSelectPreviewNameCss,
  colorSelectWrapperCss,
} from "./style"
import { Trigger } from "@illa-design/trigger"
import { ColorSelectSetterProps } from "./interface"
import chroma from "chroma-js"

export const ColorSelectSetter: FC<ColorSelectSetterProps> = (props) => {
  const {
    defaultValue,
    options,
    attrName,
    panelConfig,
    handleUpdateDsl,
    handleUpdatePanelConfig,
  } = props
  const [menuVisible, setMenuVisible] = useState(false)

  const renderContent = useCallback((color: string = "transparent") => {
    return (
      <>
        <div css={colorSelectPreviewColorCss(color)} />
        <div css={colorSelectPreviewNameCss}>
          {color !== "transparent"
            ? chroma(color).hex().toLocaleUpperCase()
            : color}
        </div>
      </>
    )
  }, [])

  const renderMenuList = useMemo(() => {
    return (
      <div css={colorSelectMenuWrapperCss}>
        {options?.map((color) => {
          const { key, value } = color
          return (
            <div
              css={colorSelectMenuItemWrapperCss}
              key={key}
              onClick={() => {
                handleUpdatePanelConfig({ [attrName]: value })
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
  }, [renderContent, options, attrName, handleUpdatePanelConfig])

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
      <div css={colorSelectWrapperCss}>
        {renderContent(translateValueToKey)}
      </div>
    </Trigger>
  )
}
