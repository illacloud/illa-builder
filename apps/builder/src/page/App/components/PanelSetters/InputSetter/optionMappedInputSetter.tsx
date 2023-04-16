import { FC, useCallback } from "react"
import {
  getNeedComputedValue,
  realInputValue,
} from "@/utils/InspectHelper/selectWidgetHelper"
import { BaseInput } from "./baseInput"
import { BaseInputSetterProps } from "./interface"

export const OptionMappedInputSetter: FC<BaseInputSetterProps> = (props) => {
  const { attrName, handleUpdateDsl, value, widgetDisplayName } = props

  const handleValueChange = useCallback(
    (value: string) => {
      const output = getNeedComputedValue(value, widgetDisplayName)

      handleUpdateDsl(attrName, output)
    },
    [attrName, handleUpdateDsl, widgetDisplayName],
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
