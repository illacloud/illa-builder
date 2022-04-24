import { FC, useMemo, useState } from "react"
import { Input } from "@illa-design/input"
import { Switch } from "@illa-design/switch"
import Label from "./label"
import {
  singleWrapperCss,
  doubleWrapperCss,
  labelWrapper,
  inputWrapper,
} from "./style"
import { ISwitchInputProps } from "./interface"
import FxButton from "./fxButton"

const SwitchInput: FC<ISwitchInputProps> = (props) => {
  const { canCustom, labelName, labelDesc, isCustom } = props

  const [isCustomModel, setIsCustomModel] = useState(isCustom ?? false)

  const updateSwitchValue = (value: boolean) => {
    console.log(value)
  }

  const updateInputValue = (value: string) => {
    console.log(value)
  }

  const handleChangeCustomModal = (isCustom: boolean) => {
    setIsCustomModel(isCustom)
  }

  const renderFxSvg = useMemo(() => {
    return (
      canCustom && (
        <FxButton
          isCustom={isCustomModel}
          updateCustomModal={handleChangeCustomModal}
        />
      )
    )
  }, [isCustomModel, canCustom])

  const renderSimple = useMemo(() => {
    return (
      <div css={singleWrapperCss}>
        <div>
          <Label labelName={labelName} labelDesc={labelDesc} />
        </div>
        <div css={inputWrapper}>
          {renderFxSvg}
          <Switch
            colorScheme="purple"
            onChange={updateSwitchValue}
            style={{ marginLeft: "8px" }}
          />
        </div>
      </div>
    )
  }, [renderFxSvg, labelName, labelDesc])

  const renderCustom = useMemo(() => {
    return (
      <div css={doubleWrapperCss}>
        <div css={labelWrapper}>
          <Label labelName={labelName} labelDesc={labelDesc} />
          {renderFxSvg}
        </div>
        <div>
          <Input borderColor="purple" onChange={updateInputValue} />
        </div>
      </div>
    )
  }, [renderFxSvg, labelDesc, labelName])

  return <>{isCustomModel ? renderCustom : renderSimple}</>
}

export default SwitchInput
