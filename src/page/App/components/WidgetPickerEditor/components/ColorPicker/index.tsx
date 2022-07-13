import ColorPickerOperation from "./ColorPickerOperation"
import { Trigger } from "@illa-design/trigger"
import { Input } from "@illa-design/input"
import {
  applyColorLumpCss,
  colorInputContainerCss,
  colorInputCss,
  labelCss,
  percentInputCss,
  triggerCss,
} from "./styles"
import { HsvaColor, hsvaToRgba, hsvaToHex, hexToHsva } from "@uiw/color-convert"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ColorPickerProps } from "./interface"
import useDebounce from "react-use/lib/useDebounce"

function isValidHex(hex: string) {
  const reg = new RegExp(`[A-Za-z0-9]{2}`, "g")
  return hex.match(reg) !== null
}

function percentToFloat(percent: string) {
  return Number(percent.replaceAll("%", "")) / 100
}

function updateAlphaInputValue(alpha: number) {
  if (alpha === 1 || alpha === 0) {
    return alpha * 100 + "%"
  } else {
    return (alpha * 100).toFixed(1) + "%"
  }
}

function ColorPicker(props: ColorPickerProps) {
  const { defaultColor = "#FFFFFF", labelName = "background" } = props
  const defaultHsva = useMemo(
    () => hexToHsva(defaultColor.substring(0, 7)),
    [defaultColor],
  )
  const [hsva, setHsva] = useState<HsvaColor>(defaultHsva)
  const [currentVisible, setCurrentVisible] = useState(false)
  const [inputValue, setInputValue] = useState(hsvaToHex(hsva))
  const [alphaPercentValue, setAlphaPercentValue] = useState("100%")

  const handleColorPick = useCallback(
    (hsva: HsvaColor) => {
      setHsva(hsva)
      setAlphaPercentValue(updateAlphaInputValue(hsva.a))
      setInputValue(hsvaToHex(hsva))
      props.onColorChange && props.onColorChange(hsva)
    },
    [props.onColorChange],
  )

  const [inputFocus, setInputFocus] = useState(false)
  const [debouncedInputFocus, setDebouncedInputFocus] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const alphaInputRef = useRef<HTMLInputElement>(null)

  useDebounce(
    () => {
      setDebouncedInputFocus(inputFocus)
    },
    50,
    [inputFocus],
  )

  return (
    <div placeholder={props.placeholder} css={colorInputContainerCss}>
      <span css={labelCss}>{labelName}</span>
      <div css={colorInputCss}>
        <Input
          inputRef={inputRef}
          highlight={debouncedInputFocus}
          prefix={{
            render: (
              <div css={triggerCss}>
                <Trigger
                  colorScheme={"white"}
                  trigger={"click"}
                  clickOutsideToClose
                  withoutPadding={true}
                  popupVisible={currentVisible}
                  position={"bottom"}
                  onVisibleChange={setCurrentVisible}
                  content={
                    <ColorPickerOperation
                      color={hsva}
                      handleHueChange={props.onHueChange}
                      handleAlphaChange={props.onAlphaChange}
                      prefabricatedColors={props.prefabricatedColors}
                      handleColorPick={handleColorPick}
                      handleClosePanel={() => setCurrentVisible(false)}
                    />
                  }
                >
                  <div css={applyColorLumpCss(hsvaToRgba(hsva))} />
                </Trigger>
              </div>
            ),
            custom: true,
          }}
          requirePadding={false}
          style={{ width: 146, height: 40, fontSize: 12 }}
          borderColor={"purple"}
          value={inputValue}
          onChange={(value) => {
            setInputValue(value)
            const _hsva = isValidHex(value)
              ? hexToHsva(value.substring(0, 7))
              : defaultHsva
            setHsva(_hsva)
            setAlphaPercentValue(updateAlphaInputValue(_hsva.a))
          }}
          onBlur={() => {
            setInputFocus(false)
            props.onColorChange && props.onColorChange(hsva)
            setInputValue(hsvaToHex(hsva))
          }}
          withoutNormalBorder={true}
          onFocus={() => setInputFocus(true)}
          spellCheck={false}
          suffix={{
            render: (
              <input
                style={{ fontSize: 12 }}
                ref={alphaInputRef}
                value={alphaPercentValue}
                onChange={(event) => {
                  if (event.target && event.target.value.length > 0) {
                    let alpha
                    if (event.target.value.includes("%")) {
                      alpha = percentToFloat(event.target.value)
                    } else {
                      alpha = Number(event.target.value) / 100
                    }
                    if (isNaN(alpha)) {
                      alpha = defaultHsva.a
                    } else if (alpha > 1) {
                      alpha = 1
                    } else if (alpha < 0) {
                      alpha = 0
                    }
                    setHsva({ ...hsva, a: alpha })
                  }
                  setAlphaPercentValue(event.target.value)
                }}
                onFocus={() => {
                  setInputFocus(true)
                }}
                onBlur={() => {
                  setInputFocus(false)
                  setAlphaPercentValue(hsva.a * 100 + "%")
                  props.onColorChange && props.onColorChange(hsva)
                }}
                css={percentInputCss}
              />
            ),
            custom: true,
          }}
        />
      </div>
    </div>
  )
}

export default ColorPicker
