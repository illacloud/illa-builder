import { FC, useContext, useMemo } from "react"
import { applySetterWrapperStyle } from "./style"
import { PanelSetterProps } from "./interface"
import { getSetterByType } from "@/page/Editor/components/PanelSetters"
import { PanelLabel } from "./label"
import { SelectedPanelContext } from "@/page/Editor/components/InspectPanel/context/selectedContext"

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

  const { configPanel, handleUpdateDsl, handleUpdateConfigPanel } =
    useContext(SelectedPanelContext)

  const canRenderSetter = useMemo(() => {
    if (!bindAttrName || !shown) return true
    const bindAttrNameValue = configPanel[bindAttrName]
    return shown(bindAttrNameValue)
  }, [shown, configPanel])

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
        panelConfig={configPanel}
        handleUpdateDsl={handleUpdateDsl}
        handleUpdateConfigPanel={handleUpdateConfigPanel}
      />
    ) : null
  }, [Comp, props, configPanel, handleUpdateDsl])

  return canRenderSetter ? (
    <div css={applySetterWrapperStyle(isFullWidth, useCustomLabel, isInList)}>
      {renderLabel}
      {renderSetter}
    </div>
  ) : null
}

Setter.displayName = "Setter"
