import { FC, useMemo } from "react"
import { applyPaddingStyle, applySetterWrapperStyle } from "./style"
import { PanelSetterProps } from "./interface"
import { getSetterByType } from "../PanelSetters"
import { PanelLabel } from "./label"

export const Setter: FC<PanelSetterProps> = (props) => {
  const {
    setterType,
    isFullWidth,
    isInList,
    labelName,
    labelDesc,
    useCustomLabel = false,
  } = props
  const Comp = getSetterByType(setterType)

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
        <Comp {...props} />
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

Setter.displayName = "Setter"
