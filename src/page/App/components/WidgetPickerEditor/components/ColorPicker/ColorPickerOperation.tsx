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
  titleCss,
} from "./styles"
import Alpha from "@uiw/react-color-alpha"
import Hue from "@uiw/react-color-hue"
import { hsvaToRgba, hexToHsva, hsvaToHex } from "@uiw/color-convert"
import { PointerProps } from "@uiw/react-color-alpha/cjs/Pointer"
import { ColorPickerOperationProps } from "./interface"
import { CloseIcon } from "@illa-design/icon"
import { useCallback } from "react"
import { css } from "@emotion/react"

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
      <div css={applyColorCheckedItemContainer(props.checked)}>
        <div
          onClick={props.handleClick}
          css={applyColorSwatchCss(props.color)}
        />
      </div>
    </div>
  )
}

function ColorPickerOperation(props: ColorPickerOperationProps) {
  const { prefabricatedColors } = props
  const swatchItemClick = useCallback(
    (hexStr: string) => {
      props.handleColorPick(hexToHsva(hexStr))
    },
    [props.handleColorPick],
  )
  return (
    <div css={saturationCss}>
      <div css={titleCss}>
        <span>edit color</span>
        <CloseIcon
          _css={css`
            cursor: pointer;
          `}
          onClick={props.handleClosePanel}
        />
      </div>
      <Saturation
        radius={4}
        style={{ width: 230, height: 171 }}
        hsva={props.color}
        onChange={(newColor) => {
          props.handleColorPick({
            ...props.color,
            ...newColor,
            a: props.color.a,
          })
        }}
      />
      <div css={slideAndLumpContainerCss}>
        <div css={slideContainerCss}>
          <Hue
            width={190}
            height={8}
            radius={4}
            pointer={HueBar}
            hue={props.color.h}
            onChange={(newHue) => {
              props.handleColorPick({ ...props.color, ...newHue })
              props.handleHueChange && props.handleHueChange(newHue)
            }}
          />
          <Alpha
            css={slideCss}
            width={190}
            height={8}
            radius={4}
            pointer={AlphaBar}
            hsva={props.color}
            onChange={(newAlpha) => {
              props.handleColorPick({ ...props.color, ...newAlpha })
              props.handleAlphaChange && props.handleAlphaChange(newAlpha)
            }}
          />
        </div>
        <div css={applyColorLumpCss(hsvaToRgba(props.color))} />
      </div>
      <span css={sessionTitleCss}>Prefabricated color</span>
      <div css={swatchContainerCss}>
        {prefabricatedColors?.map((colorStr) => {
          return (
            <Point
              checked={
                JSON.stringify(hexToHsva(colorStr)) ===
                JSON.stringify(props.color)
              }
              color={colorStr}
              handleClick={() => {
                swatchItemClick(colorStr)
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ColorPickerOperation
