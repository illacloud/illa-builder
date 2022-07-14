import { FC, useEffect, useState } from "react"
import { ColorListSetter } from "@/page/App/components/PanelSetters/ChartSetter/DatasetsSetter/interface"
import { COLOR_SCHEME } from "@/widgetLibrary/Chart/interface"
import ColorPicker from "@/page/App/components/WidgetPickerEditor/components/ColorPicker"
import { get } from "lodash"
import { hsvaToHex } from "@uiw/color-convert"

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
      {lineColor.map((color: string, index: number) => (
        <ColorPicker
          color={color}
          prefabricatedColors={COLOR_SCHEME}
          onColorChange={(value) => {
            const newValue = lineColor.map((item: string, i: number) => {
              return i === index ? hsvaToHex(value) : item
            })
            setLineColor(newValue)
          }}
        />
      ))}
    </div>
  )
}
