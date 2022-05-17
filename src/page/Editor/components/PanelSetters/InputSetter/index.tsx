import { FC, useMemo } from "react"
import { InputSetterProps } from "./interface"
import PanelLabel from "../../InspectPanel/label"
import { Input } from "@illa-design/Input"
import { applyInputSetterStyle, applyInputWrapperStyle } from "./style"

const InputSetter: FC<InputSetterProps> = (props) => {
  const {
    labelName,
    labelDesc,
    isDouble,
    handleChange,
    placeholder,
    defaultValue,
  } = props

  const renderContent = useMemo(() => {
    return (
      <>
        <PanelLabel labelName={labelName} labelDesc={labelDesc} />
        <div css={applyInputWrapperStyle(isDouble)}>
          <Input
            onChange={handleChange}
            borderColor="purple"
            placeholder={placeholder}
            defaultValue={defaultValue}
          />
        </div>
      </>
    )
  }, [labelName, labelDesc, handleChange])

  return <div css={applyInputSetterStyle(isDouble)}>{renderContent}</div>
}

export default InputSetter
