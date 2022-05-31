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

  const { panelConfig, handleUpdateDsl, handleUpdatePanelConfig } =
    useContext(SelectedPanelContext)

  const canRenderSetter = useMemo(() => {
    if (!bindAttrName || !shown) return true
    const bindAttrNameValue = panelConfig[bindAttrName]
    return shown(bindAttrNameValue)
  }, [shown, panelConfig])

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
        panelConfig={panelConfig}
        handleUpdateDsl={handleUpdateDsl}
        handleUpdatePanelConfig={handleUpdatePanelConfig}
      />
    ) : null
  }, [Comp, props, panelConfig, handleUpdateDsl, handleUpdatePanelConfig])

  return canRenderSetter ? (
    <div
      css={applySetterWrapperStyle(
        isFullWidth,
        !!labelName,
        useCustomLabel,
        isInList,
      )}
    >
      {renderLabel}
      {renderSetter}
    </div>
  ) : null
}

Setter.displayName = "Setter"
