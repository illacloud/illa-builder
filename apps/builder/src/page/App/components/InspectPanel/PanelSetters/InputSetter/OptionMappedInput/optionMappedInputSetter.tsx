import { FC, useCallback } from "react"
import {
  getNeedComputedValue,
  realInputValue,
} from "@/utils/InspectHelper/selectWidgetHelper"
import BaseInput from "../BaseInput"
import { BaseInputSetterProps } from "../interface"

const OptionMappedInputSetter: FC<BaseInputSetterProps> = (props) => {
  const { handleUpdateDsl, value, widgetDisplayName } = props

  const handleValueChange = useCallback(
    (attrName: string, value: string) => {
      const output = getNeedComputedValue(value, widgetDisplayName)
      handleUpdateDsl(attrName, output)
    },
    [handleUpdateDsl, widgetDisplayName],
  )

  const wrappedCodeFunc = useCallback(
    (value: string) => {
      return getNeedComputedValue(value, widgetDisplayName)
    },
    [widgetDisplayName],
  )

  return (
    <BaseInput
      {...props}
      value={realInputValue(value, widgetDisplayName)}
      handleUpdateDsl={handleValueChange}
      wrappedCodeFunc={wrappedCodeFunc}
    />
  )
}

OptionMappedInputSetter.displayName = "OptionMappedInputSetter"
export default OptionMappedInputSetter
