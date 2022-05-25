import { FC, useContext, useMemo } from "react"
import { applySetterWrapperStyle } from "./style"
import { PanelSetterProps } from "./interface"
import { getSetterByType } from "@/page/Editor/components/PanelSetters"
import { PanelLabel } from "./label"
import { ConfigPanelContext } from "./context"

export const Setter: FC<PanelSetterProps> = (props) => {
  const {
    setterType,
    isFullWidth,
    isInList,
    labelName,
    labelDesc,
    useCustomLabel = false,
    shown,
    bindAttrName,
  } = props
  const Comp = getSetterByType(setterType)

  const { tempProps, componentDsl, handleUpdateDsl } =
    useContext(ConfigPanelContext)

  const canRenderSetter = useMemo(() => {
    if (!bindAttrName || !shown) return true
    const bindAttrNameValue = tempProps[bindAttrName]
    return shown(bindAttrNameValue)
  }, [shown, tempProps])

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
      <Comp
        {...props}
        tempProps={tempProps}
        componentDsl={componentDsl}
        handleUpdateDsl={handleUpdateDsl}
      />
    ) : null
  }, [Comp, props, tempProps, componentDsl, handleUpdateDsl])

  return canRenderSetter ? (
    <div css={applySetterWrapperStyle(isFullWidth, useCustomLabel, isInList)}>
      {renderLabel}
      {renderSetter}
    </div>
  ) : null
}

Setter.displayName = "Setter"
