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
import { hsvaToRgba, hexToHsva } from "@uiw/color-convert"
import { PointerProps } from "@uiw/react-color-alpha/cjs/Pointer"
import { ColorPickerOperationProps } from "./interface"
import { CloseIcon } from "@illa-design/icon"
import { FC, useCallback, useEffect, useState } from "react"
import { css } from "@emotion/react"
import useDebounce from "react-use/lib/useDebounce"
import { useTranslation } from "react-i18next"

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
  const { prefabricatedColors, color } = props
  const [selectedColor, setSelectedColor] = useState(color)
  const [debouncedColor, setDebouncedColor] = useState(color)
  const { t } = useTranslation()

  useDebounce(
    () => {
      setDebouncedColor(selectedColor)
    },
    50,
    [selectedColor],
  )

  useEffect(() => {
    props.handleColorPick({
      ...color,
      ...debouncedColor,
    })
  }, [debouncedColor])

  const swatchItemClick = useCallback(
    (hexStr: string) => {
      props.handleColorPick(hexToHsva(hexStr))
    },
    [props.handleColorPick],
  )

  return (
    <div css={saturationCss}>
      <div css={titleCss}>
        <span>{t("editor.inspect.setter_content.color_picker.title")}</span>
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
        hsva={selectedColor}
        onChange={(newColor) => {
          setSelectedColor({
            ...color,
            ...newColor,
            a: color.a,
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
            hue={selectedColor.h}
            onChange={(newHue) => {
              setSelectedColor({ ...color, ...newHue })
              props.handleHueChange && props.handleHueChange(newHue)
            }}
          />
          <Alpha
            css={slideCss}
            width={190}
            height={8}
            radius={4}
            pointer={AlphaBar}
            hsva={selectedColor}
            onChange={(newAlpha) => {
              setSelectedColor({ ...props.color, ...newAlpha })
              props.handleAlphaChange && props.handleAlphaChange(newAlpha)
            }}
          />
        </div>
        <div css={applyColorLumpCss(hsvaToRgba(selectedColor))} />
      </div>
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
  )
}

export default ColorPickerOperation
