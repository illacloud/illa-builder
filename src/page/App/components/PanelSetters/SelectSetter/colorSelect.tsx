import { FC, useMemo, useState } from "react"
import chroma from "chroma-js"
import { Trigger } from "@illa-design/trigger"
import { ColorSelectSetterProps } from "./interface"
import {
  colorSelectMenuItemWrapperStyle,
  colorSelectMenuWrapperStyle,
  applyColorSelectPreviewColorStyle,
  colorSelectPreviewNameStyle,
  colorSelectWrapperStyle,
} from "./style"

const renderContent = (color: string = "transparent") => (
  <>
    <div css={applyColorSelectPreviewColorStyle(color)} />
    <div css={colorSelectPreviewNameStyle}>
      {color !== "transparent"
        ? chroma(color).hex().toLocaleUpperCase()
        : color}
    </div>
  </>
)

export const ColorSelectSetter: FC<ColorSelectSetterProps> = (props) => {
  const { value, options, attrName, handleUpdateDsl } = props
  const [menuVisible, setMenuVisible] = useState(false)

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
                handleUpdateDsl(attrName, value)
                setMenuVisible(false)
              }}
            >
              {renderContent(key)}
            </div>
          )
        })}
      </div>
    )
  }, [options, attrName, handleUpdateDsl])

  const translateValueToKey = useMemo(() => {
    const key = options?.find((item) => item.value === value)?.key
    return key ?? "transparent"
  }, [value, options])

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
