import { FC, useMemo } from "react"
import { applyPaddingStyle, applySetterWrapperStyle } from "./style"
import { PanelSetterProps } from "./interface"
import { getSetterByType } from "../PanelSetters"
import { debounce } from "lodash"
import PanelLabel from "./label"

const Setter: FC<PanelSetterProps> = (props) => {
  const {
    setterType,
    isFullWidth,
    isInList,
    labelName,
    labelDesc,
    useCustomLabel = false,
  } = props
  const Comp = getSetterByType(setterType)
  const handleChange = (value: any, attrName?: string) => {
    console.log(value, attrName || props.attrName)
  }

  const debounceHandleChange = debounce(handleChange, 300)

  const renderLabel = useMemo(() => {
    return !useCustomLabel && labelName ? (
      <PanelLabel
        labelName={labelName}
        labelDesc={labelDesc}
        isInList={isInList}
      />
    ) : null
  }, [labelName, labelDesc, isInList])

  const renderSetter = useMemo(() => {
    return Comp ? (
      <div css={applyPaddingStyle(isInList)}>
        <Comp {...props} handleChange={debounceHandleChange} />
      </div>
    ) : null
  }, [Comp, isInList, props])

  return (
    <div css={applySetterWrapperStyle(isFullWidth, useCustomLabel)}>
      {renderLabel}
      {renderSetter}
    </div>
  )
}
export default Setter
