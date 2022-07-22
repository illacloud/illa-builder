import Saturation from "@uiw/react-color-saturation"
import {
  applyAlphaPointCss,
  applyColorCheckedItemContainer,
  applyColorLumpCss,
  applyColorSwatchCss,
  applyHuePointCss,
  colorSwatchItemContainer,
  saturationCss,
  sessionTitleCss,
  slideAndLumpContainerCss,
  slideContainerCss,
  slideCss,
  swatchContainerCss,
  swatchWrapperStyle,
  titleCss,
} from "./styles"
import Alpha from "@uiw/react-color-alpha"
import Hue from "@uiw/react-color-hue"
import { hsvaToRgba, hexToHsva } from "@uiw/color-convert"
import { PointerProps } from "@uiw/react-color-alpha/cjs/Pointer"
import { ColorPickerOperationProps } from "./interface"
import { CloseIcon } from "@illa-design/icon"
import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import {
  closeIconStyle,
  titleStyle,
} from "@/page/App/components/PanelSetters/ColorPickerSetter/style"

const HueBar = (props: PointerProps) => (
  <div css={applyHuePointCss(props.left)} />
)

const AlphaBar = (props: PointerProps) => (
  <div css={applyAlphaPointCss(props.left)} />
)

function Point(props: {
  color?: string
  handleClick: () => void
  checked?: boolean
}) {
  return (
    <div css={colorSwatchItemContainer}>
      <div
        title={props.color}
        css={applyColorCheckedItemContainer(props.checked)}
      >
        <div
          onClick={props.handleClick}
          css={applyColorSwatchCss(props.color)}
        />
      </div>
    </div>
  )
}

const ColorPickerOperation: FC<ColorPickerOperationProps> = (
  props: ColorPickerOperationProps,
) => {
  const { prefabricatedColors, color, handleColorPick } = props
  const { t } = useTranslation()

  const swatchItemClick = useCallback(
    (hexStr: string) => {
      props.handleColorPick(hexToHsva(hexStr))
    },
    [props.handleColorPick],
  )

  return (
    <div css={saturationCss}>
      <div css={titleCss}>
        <span css={titleStyle}>
          {t("editor.inspect.setter_content.color_picker.title")}
        </span>
        <CloseIcon css={closeIconStyle} onClick={props.handleClosePanel} />
      </div>
      <Saturation
        style={{ width: "100%", height: 244 }}
        hsva={color}
        onChange={(newColor) => {
          const newColors = {
            ...color,
            ...newColor,
            a: color.a,
          }
          console.log("newColors", newColors)
          props.handleColorPick && props.handleColorPick(newColors)
        }}
      />
      <div css={slideAndLumpContainerCss}>
        <div css={slideContainerCss}>
          <Hue
            width={164}
            height={12}
            radius={6}
            pointer={HueBar}
            hue={color.h}
            onChange={(newHue) => {
              props.handleColorPick &&
                props.handleColorPick({ ...props.color, ...newHue })
            }}
          />
          <Alpha
            css={slideCss}
            width={164}
            height={12}
            radius={6}
            pointer={AlphaBar}
            hsva={color}
            onChange={(newAlpha) => {
              props.handleColorPick &&
                props.handleColorPick({ ...props.color, ...newAlpha })
            }}
          />
        </div>
        <div css={applyColorLumpCss(hsvaToRgba(color))} />
      </div>
      <div css={swatchWrapperStyle}>
        <span css={sessionTitleCss}>
          {t("editor.inspect.setter_content.color_picker.prefabricated")}
        </span>
        <div css={swatchContainerCss}>
          {prefabricatedColors?.map((item) => {
            return (
              <Point
                checked={
                  JSON.stringify(hexToHsva(item.key)) === JSON.stringify(color)
                }
                color={item.key}
                handleClick={() => {
                  swatchItemClick(item.key)
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ColorPickerOperation
