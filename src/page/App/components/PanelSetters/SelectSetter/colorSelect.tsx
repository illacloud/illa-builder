import { FC, useMemo, useState } from "react"
import chroma from "chroma-js"
import { ColorSelectSetterProps } from "./interface"
import {
  colorSelectMenuItemWrapperStyle,
  applyColorSelectPreviewColorStyle,
  colorSelectPreviewNameStyle,
  colorSelectWrapperStyle,
} from "./style"
import { Dropdown, DropList } from "@illa-design/dropdown"

const { Item } = DropList

const renderContent = (color: string = "transparent") => (
  <>
    <span css={applyColorSelectPreviewColorStyle(color)} />
    <span css={colorSelectPreviewNameStyle}>
      {color !== "transparent"
        ? chroma(color).hex().toLocaleUpperCase()
        : color}
    </span>
  </>
)

export const ColorSelectSetter: FC<ColorSelectSetterProps> = (props) => {
  const { value, options, attrName, handleUpdateDsl } = props
  const [menuVisible, setMenuVisible] = useState(false)

  const renderMenuList = useMemo(() => {
    return (
      <DropList width="120px">
        {options?.map((color) => {
          const { key, value } = color
          return (
            <Item
              css={colorSelectMenuItemWrapperStyle}
              key={key}
              onClick={() => {
                handleUpdateDsl(attrName, value)
                setMenuVisible(false)
              }}
            >
              {renderContent(key)}
            </Item>
          )
        })}
      </DropList>
    )
  }, [options, attrName, handleUpdateDsl])

  const translateValueToKey = useMemo(() => {
    const key = options?.find((item) => item.value === value)?.key
    return key ?? "transparent"
  }, [value, options])

  return (
    <Dropdown
      dropList={renderMenuList}
      position="bottom"
      onVisibleChange={setMenuVisible}
      popupVisible={menuVisible}
      trigger="click"
    >
      <div css={colorSelectWrapperStyle}>
        {renderContent(translateValueToKey)}
      </div>
    </Dropdown>
  )
}
