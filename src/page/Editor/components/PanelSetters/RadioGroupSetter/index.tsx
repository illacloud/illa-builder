import { FC, useMemo } from "react"
import PanelLabel from "../../InspectPanel/label"
import {
  applyRadioGroupSetterStyle,
  applyRadioGroupWrapperStyle,
} from "./style"
import { RadioGroup } from "@illa-design/radio"
import { RadioGroupProps } from "./interface"

const RadioGroupSetter: FC<RadioGroupProps> = (props) => {
  const {
    labelName,
    labelDesc,
    isDouble,
    handleChange,
    defaultValue,
    options,
  } = props
  const renderContent = useMemo(() => {
    return (
      <>
        <PanelLabel labelName={labelName} labelDesc={labelDesc} />
        <div css={applyRadioGroupWrapperStyle(isDouble)}>
          <RadioGroup
            onChange={handleChange}
            defaultValue={defaultValue}
            options={options}
            type="button"
            size="small"
          />
        </div>
      </>
    )
  }, [labelName, labelDesc, handleChange])

  return <div css={applyRadioGroupSetterStyle(isDouble)}>{renderContent}</div>
}

export default RadioGroupSetter
