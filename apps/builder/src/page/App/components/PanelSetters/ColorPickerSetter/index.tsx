import { FC } from "react"
import { debounce } from "lodash"
import { ColorPicker } from "@/page/App/components/WidgetPickerEditor/components/ColorPicker"
import { Trigger } from "@illa-design/trigger"
import { Button } from "@illa-design/button"
import { applyCircleStyle } from "@/page/App/components/PanelSetters/ColorPickerSetter/style"
import { colorSchemes } from "@/widgetLibrary/PublicSector/colorSchemeOptions"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const ColorPickerSetter: FC<any> = props => {
  const { attrName, handleUpdateDsl, value, isSetterSingleRow } = props
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
      <Button
        variant="text"
        colorScheme="grayBlue"
        leftIcon={<div css={applyCircleStyle(c)} />}
      >
        {value}
      </Button>
    </Trigger>
  )
}

ColorPickerSetter.displayName = "ColorPickerSetter"
