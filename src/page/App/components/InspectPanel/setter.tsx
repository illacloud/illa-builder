import { FC, useContext, useMemo } from "react"
import { applySetterWrapperStyle } from "./style"
import { PanelSetterProps } from "./interface"
import { getSetterByType } from "@/page/App/components/PanelSetters"
import { PanelLabel } from "./label"
import { SelectedPanelContext } from "@/page/App/components/InspectPanel/context/selectedContext"

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
    attrName,
  } = props
  const Comp = getSetterByType(setterType)

  const { widgetProps, handleUpdateDsl, handleUpdateDynamicStrings } =
    useContext(SelectedPanelContext)

  const canRenderSetter = useMemo(() => {
    if (!bindAttrName || !shown) return true
    const bindAttrNameValue = widgetProps[bindAttrName]
    return shown(bindAttrNameValue)
  }, [shown, widgetProps])

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
    const defaultValue = widgetProps[attrName]
    const expectedType = props.expectedType
    return Comp ? (
      <Comp
        {...props}
        value={defaultValue}
        panelConfig={widgetProps}
        handleUpdateDsl={handleUpdateDsl}
        handleUpdateDynamicStrings={handleUpdateDynamicStrings}
        expectedType={expectedType ?? "String"}
      />
    ) : null
  }, [Comp, props, widgetProps, attrName, handleUpdateDsl])

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
