import { hexToHsva } from "@uiw/react-color"
import { debounce } from "lodash"
import { FC } from "react"
import { Trigger, globalColor, illaPrefix } from "@illa-design/react"
import { ColorPicker } from "@/page/App/components/ColorPicker"
import {
  ButtonContentWrapperStyle,
  alphaContentStyle,
  applyCircleStyle,
  colorContentStyle,
  inListSetterWrapperStyle,
} from "@/page/App/components/PanelSetters/ColorPickerSetter/style"
import { colorSchemes } from "@/widgetLibrary/PublicSector/colorSchemeOptions"

export const ColorPickerSetter: FC<any> = (props) => {
  const { attrName, handleUpdateDsl, value } = props
  const debounceOnChange = debounce(handleUpdateDsl, 300)

  let c = value
  if (colorSchemes.includes(value)) {
    c = globalColor(`--${illaPrefix}-${value}-03`)
  }
  return (
    <Trigger
      trigger="click"
      withoutPadding
      clickOutsideToClose
      position="bottom-end"
      colorScheme="white"
      content={
        <ColorPicker
          selectedColor={value}
          onChange={(color) => {
            debounceOnChange(attrName, color)
          }}
        />
      }
    >
      <div css={inListSetterWrapperStyle}>
        <div css={ButtonContentWrapperStyle}>
          <div css={applyCircleStyle(c)} />
          <span css={colorContentStyle}>
            {value?.includes("#")
              ? value?.toLocaleUpperCase().slice(0, -2)
              : value}
          </span>
          <span css={alphaContentStyle}>
            {parseInt(`${hexToHsva(c || "#fff").a * 100}`)}%
          </span>
        </div>
      </div>
    </Trigger>
  )
}

ColorPickerSetter.displayName = "ColorPickerSetter"
