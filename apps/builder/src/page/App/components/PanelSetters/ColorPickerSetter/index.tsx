import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { hexToHsva } from "@uiw/react-color"
import { debounce } from "lodash"
import { FC, useRef } from "react"
import { Trigger, globalColor, illaPrefix } from "@illa-design/react"
import { ColorPicker } from "@/page/App/components/ColorPicker"
import {
  ButtonContentWrapperStyle,
  alphaContentStyle,
  applyCircleStyle,
  colorContentStyle,
  inListSetterWrapperStyle,
} from "@/page/App/components/PanelSetters/ColorPickerSetter/style"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { colorSchemes } from "@/widgetLibrary/PublicSector/colorSchemeOptions"

const ColorPickerSetter: FC<any> = (props) => {
  const { attrName, handleUpdateDsl, value, widgetType } = props
  const currentColor = useRef<string>(value)
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
            currentColor.current = color
            debounceOnChange(attrName, color)
          }}
        />
      }
      onVisibleChange={(visible) => {
        if (visible) {
          trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
            element: "component_inspect_color_select",
            parameter1: widgetType,
            parameter2: attrName,
          })
        } else {
          trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.BLUR, {
            element: "component_inspect_color_select",
            parameter1: widgetType,
            parameter2: attrName,
            parameter3: currentColor.current,
          })
        }
      }}
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

export default ColorPickerSetter
