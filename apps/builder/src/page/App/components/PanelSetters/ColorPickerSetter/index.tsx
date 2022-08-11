import { FC } from "react"
import { ColorPicker } from "../../WidgetPickerEditor/components/ColorPicker"

export const ColorPickerSetter: FC<any> = props => {
  const { attrName, handleUpdateDsl, value, isSetterSingleRow } = props
  return <ColorPicker />
}

ColorPickerSetter.displayName = "ColorPickerSetter"
