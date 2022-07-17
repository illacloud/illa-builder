import { FC, useEffect, useState } from "react"
import { ColorListSetter } from "@/page/App/components/PanelSetters/ChartSetter/DatasetsSetter/interface"
import { COLOR_SCHEME } from "@/widgetLibrary/Chart/interface"
import ColorPicker from "@/page/App/components/WidgetPickerEditor/components/ColorPicker"
import { get } from "lodash"
import { hsvaToHexa } from "@uiw/color-convert"

const _colorOptions = COLOR_SCHEME.map((item) => ({
  key: item,
  value: item,
}))

export const DataSetColorListSetter: FC<ColorListSetter> = (props) => {
  const { handleUpdateDsl, attrName, panelConfig, parentAttrName } = props

  const [lineColor, setLineColor] = useState(
    get(panelConfig, `${parentAttrName}.lineColor`),
  )

  useEffect(() => {
    handleUpdateDsl(attrName, lineColor)
  }, [lineColor])

  return (
    <div>
      {typeof lineColor === "string" ? (
        <ColorPicker
          color={lineColor}
          prefabricatedColors={COLOR_SCHEME.map((item) => ({
            key: item,
            value: item,
          }))}
          onColorChange={(value) => {
            setLineColor(hsvaToHexa(value))
          }}
        />
      ) : (
        lineColor.map((color: string, index: number) => (
          <ColorPicker
            color={color}
            prefabricatedColors={_colorOptions}
            onColorChange={(value) => {
              const newValue = lineColor.map((item: string, i: number) => {
                return i === index ? hsvaToHexa(value) : item
              })
              setLineColor(newValue)
            }}
          />
        ))
      )}
    </div>
  )
}
