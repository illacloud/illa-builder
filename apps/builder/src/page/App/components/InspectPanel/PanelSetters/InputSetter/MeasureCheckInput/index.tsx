import { FC, FocusEvent, useCallback } from "react"
import { Input } from "@illa-design/react"
import { PanelLabel } from "@/page/App/components/InspectPanel/components/Label"
import { MeasureCheckInputSetterProps } from "./interface"
import { setterContainerStyle } from "./style"

const valueWithMeasureRegex = /^\d+(\.\d+)?(px|vh|vw|%|em|rem|cm|mm|in|pt|pc)$/

const MeasureCheckInput: FC<MeasureCheckInputSetterProps> = (props) => {
  const {
    handleUpdateMultiAttrDSL,
    attrName,
    value,
    icon,
    labelName,
    labelSize = "small",
    labelDesc,
  } = props

  const handleUpdateBorderWidth = useCallback(
    (currentValue: string) => {
      handleUpdateMultiAttrDSL?.({
        [attrName]: currentValue,
      })
    },
    [attrName, handleUpdateMultiAttrDSL],
  )

  const fixInputValueWhenBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      let currentValue = e.target.value.toLocaleLowerCase().replace(/\s*/g, "")
      if (currentValue && !valueWithMeasureRegex.test(currentValue)) {
        const decimalArr = currentValue.match(/\d+(\.\d+)?/g)
        if (decimalArr) currentValue = decimalArr.join("") + "px"
      }
      handleUpdateMultiAttrDSL?.({
        [attrName]: currentValue,
      })
    },
    [attrName, handleUpdateMultiAttrDSL],
  )

  return (
    <div css={setterContainerStyle}>
      <PanelLabel
        labelName={labelName}
        labelDesc={labelDesc}
        labelSize={labelSize}
      />
      <Input
        onChange={handleUpdateBorderWidth}
        value={value}
        prefix={icon}
        w="170px"
        onBlur={fixInputValueWhenBlur}
        colorScheme="techPurple"
      />
    </div>
  )
}

export default MeasureCheckInput
