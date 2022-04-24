import { FC, useMemo, useState } from "react"
import { ISelectInputProps } from "./interface"
import { Select, Option } from "@illa-design/select"
import { Input } from "@illa-design/input"
import Label from "./label"
import FxButton from "./fxButton"
import {
  singleWrapperCss,
  doubleWrapperCss,
  labelWrapper,
  inputWrapper,
} from "./style"

const SelectInput: FC<ISelectInputProps> = (props) => {
  const {
    options,
    value: defaultValue,
    canCustom,
    isCustom,
    labelName,
    labelDesc,
    isDoubleRow,
  } = props

  const [selectValue, setSelectValue] = useState(defaultValue)
  const [inputValue, setInputValue] = useState(defaultValue)
  const [isCustomModel, setIsCustomModel] = useState(isCustom ?? false)

  const handleChangeSelectValue = (value: string) => {
    console.log(value)
    setSelectValue(value)
  }

  const handleChangeInputValue = (value: string) => {
    setInputValue(value)
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
          <Select
            showSearch
            size="small"
            borderColor="purple"
            onChange={handleChangeSelectValue}
            value={selectValue}
            style={{ marginLeft: "8px" }}
          >
            {options.map((option) => (
              <Option key={option.key} value={option.value}>
                {option.key}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    )
  }, [renderFxSvg, labelName, labelDesc, selectValue])

  const renderCustom = useMemo(() => {
    return (
      <div css={doubleWrapperCss}>
        <div css={labelWrapper}>
          <Label labelName={labelName} labelDesc={labelDesc} />
          {renderFxSvg}
        </div>
        <div>
          <Input value={inputValue} onChange={handleChangeInputValue} />
        </div>
      </div>
    )
  }, [renderFxSvg, labelDesc, labelName, inputValue])

  return <>{isCustomModel || isDoubleRow ? renderCustom : renderSimple}</>
}

export default SelectInput
