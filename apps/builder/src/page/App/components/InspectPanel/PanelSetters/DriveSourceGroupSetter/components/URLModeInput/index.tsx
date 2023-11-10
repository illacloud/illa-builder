import { FC } from "react"
import BaseInput from "@/page/App/components/InspectPanel/PanelSetters/InputSetter/BaseInput"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { URLModeInputProps } from "./interface"

const URLModeInput: FC<URLModeInputProps> = (props) => {
  return (
    <BaseInput
      {...props}
      isSetterSingleRow
      expectedType={VALIDATION_TYPES.STRING}
    />
  )
}

export default URLModeInput
