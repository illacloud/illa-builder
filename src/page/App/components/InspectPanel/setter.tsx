import { FC, useContext, useMemo } from "react"
import { get } from "lodash"
import { applySetterWrapperStyle } from "./style"
import { PanelSetterProps } from "./interface"
import { getSetterByType } from "@/page/App/components/PanelSetters"
import { PanelLabel } from "./label"
import { SelectedPanelContext } from "@/page/App/components/InspectPanel/context/selectedContext"

export const Setter: FC<PanelSetterProps> = (props) => {
  const {
    setterType,
    isSetterSingleRow,
    isInList,
    labelName,
    labelDesc,
    useCustomLayout = false,
    shown,
    bindAttrName,
    attrName,
    parentAttrName,
  } = props
  const Comp = getSetterByType(setterType)

  const { widgetProps, handleUpdateDsl, widgetDisplayName } =
    useContext(SelectedPanelContext)

  const canRenderSetter = useMemo(() => {
    if (!bindAttrName || !shown) return true
    const bindAttrNameValue = widgetProps[bindAttrName]
    return shown(bindAttrNameValue)
  }, [shown, widgetProps])

  const renderLabel = useMemo(() => {
    return !useCustomLayout && labelName ? (
      <PanelLabel
        labelName={labelName}
        labelDesc={labelDesc}
        isInList={isInList}
      />
    ) : null
  }, [useCustomLayout, labelName, labelDesc, isInList])

  const _finalAttrName = useMemo(() => {
    if (parentAttrName) {
      return `${parentAttrName}.${attrName}`
    }
    return attrName
  }, [parentAttrName, attrName])

  const canWrapped = useMemo(() => {
    if (renderLabel) {
      const value = get(widgetProps, _finalAttrName)
      return typeof value === "string" && value.includes("\n")
    }
    return false
  }, [renderLabel, widgetProps, attrName])

  const isSetterSingleRowWrapper = useMemo(() => {
    return isSetterSingleRow || !labelName || canWrapped
  }, [isSetterSingleRow, labelName, canWrapped])

  const renderSetter = useMemo(() => {
    const value = get(widgetProps, _finalAttrName)
    const expectedType = props.expectedType
    return Comp ? (
      <Comp
        {...props}
        attrName={_finalAttrName}
        isSetterSingleRow={isSetterSingleRowWrapper}
        value={value}
        panelConfig={widgetProps}
        handleUpdateDsl={handleUpdateDsl}
        widgetDisplayName={widgetDisplayName}
        expectedType={expectedType ?? "String"}
      />
    ) : null
  }, [
    Comp,
    props,
    widgetProps,
    attrName,
    handleUpdateDsl,
    isSetterSingleRowWrapper,
    _finalAttrName,
  ])

  return canRenderSetter ? (
    <div
      css={applySetterWrapperStyle(
        isSetterSingleRow,
        isInList,
        isSetterSingleRowWrapper,
        useCustomLayout,
      )}
    >
      {renderLabel}
      {renderSetter}
    </div>
  ) : null
}

Setter.displayName = "Setter"
