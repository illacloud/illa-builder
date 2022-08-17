import { FC } from "react"
import { debounce } from "lodash"
import { ColorPicker } from "@/page/App/components/WidgetPickerEditor/components/ColorPicker"
import { Trigger } from "@illa-design/trigger"
import {
  alphaContentStyle,
  applyCircleStyle,
  ButtonContentWrapperStyle,
  colorContentStyle,
  inListSetterWrapperStyle,
} from "@/page/App/components/PanelSetters/ColorPickerSetter/style"
import { colorSchemes } from "@/widgetLibrary/PublicSector/colorSchemeOptions"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { hexToHsva } from "@uiw/color-convert/src"

export const ColorPickerSetter: FC<any> = props => {
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
      position="br"
      colorScheme="white"
      content={
        <ColorPicker
          selectedColor={value}
          onChange={color => {
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
            {parseInt(`${hexToHsva(c).a * 100}`)}%
          </span>
        </div>
      </div>
    </Trigger>
  )
}

ColorPickerSetter.displayName = "ColorPickerSetter"
