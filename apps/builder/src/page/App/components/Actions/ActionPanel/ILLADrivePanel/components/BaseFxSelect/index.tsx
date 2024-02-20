import { FC } from "react"
import { FxIcon } from "@illa-design/react"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { containerStyle, getFxIconStyle } from "./style"

interface BaseFxSelectProps {
  attrName: string
  value: string
  isFx: boolean
  label: string
  options: string[]
  handleOptionsValueChange: (name: string, value: string | boolean) => void
}

export const BaseFxSelect: FC<BaseFxSelectProps> = (props) => {
  const { attrName, value, isFx, options, label, handleOptionsValueChange } =
    props

  const handleOnClick = () => {
    handleOptionsValueChange(`${attrName}Fx`, !isFx)
  }

  return (
    <div css={containerStyle}>
      {isFx ? (
        <InputEditor
          title={label}
          value={value}
          onChange={(v) => handleOptionsValueChange(attrName, v as string)}
          expectedType={VALIDATION_TYPES.STRING}
        />
      ) : (
        <SingleTypeComponent
          title={label}
          componentType="select"
          value={value}
          onChange={(v) => handleOptionsValueChange(attrName, v as string)}
          options={options}
        />
      )}
      <FxIcon onClick={handleOnClick} css={getFxIconStyle(isFx)} />
    </div>
  )
}
BaseFxSelect.displayName = "BaseFxSelect"
