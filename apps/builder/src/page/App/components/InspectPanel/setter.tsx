import { get, toPath } from "lodash"
import { memo, useContext, useMemo } from "react"
import { useSelector } from "react-redux"
import { getSetterByType } from "@/page/App/components/InspectPanel/PanelSetters"
import { SelectedPanelContext } from "@/page/App/components/InspectPanel/context/selectedContext"
import { getComponentNodeBySingleSelected } from "@/redux/currentApp/editor/components/componentsSelector"
import { getGuideStatus } from "@/redux/guide/guideSelector"
import { convertPathToString } from "@/utils/executionTreeHelper/utils"
import { PanelLabel } from "./components/Label"
import { PanelSetterProps } from "./interface"
import { applySetterPublicWrapperStyle, applySetterWrapperStyle } from "./style"

export const Setter = memo<PanelSetterProps>((props: PanelSetterProps) => {
  const {
    setterType,
    isSetterSingleRow,
    labelName,
    labelDesc,
    useCustomLayout = false,
    shown,
    bindAttrName,
    attrName,
    parentAttrName,
    expectedType,
    defaultValue,
    icon,
    canShowLabel = true,
  } = props
  const Comp = getSetterByType(setterType)
  const isGuideMode = useSelector(getGuideStatus)
  const componentNode = useSelector(getComponentNodeBySingleSelected)
  const {
    widgetProps,
    widgetDisplayName,
    widgetType,
    widgetOrAction,
    handleUpdateDsl,
    handleUpdateMultiAttrDSL,
    handleUpdateOtherMultiAttrDSL,
  } = useContext(SelectedPanelContext)

  const canRenderSetter = useMemo(() => {
    if (!bindAttrName || !shown) return true
    if (Array.isArray(bindAttrName)) {
      const bindAttrNameValues = bindAttrName.map((bindAttrNameItem) => {
        if (parentAttrName) {
          return get(widgetProps, `${parentAttrName}.${bindAttrNameItem}`)
        }
        return get(widgetProps, bindAttrNameItem)
      })
      return shown(...bindAttrNameValues)
    }
    return true
  }, [bindAttrName, shown, parentAttrName, widgetProps])

  const renderLabel = useMemo(() => {
    return canShowLabel && !useCustomLayout && labelName ? (
      <PanelLabel labelName={labelName} labelDesc={labelDesc} />
    ) : null
  }, [canShowLabel, useCustomLayout, labelName, labelDesc])

  const _finalAttrName = useMemo(() => {
    if (typeof attrName === "string") {
      if (parentAttrName) {
        const parentAttrNamePath = toPath(parentAttrName)
        return convertPathToString([...parentAttrNamePath, attrName])
      }
      return attrName
    }
    return ""
  }, [parentAttrName, attrName])

  const isSetterSingleRowWrapper = isSetterSingleRow || !labelName

  const finalValue = useMemo(() => {
    if (typeof _finalAttrName === "string") {
      return get(widgetProps, _finalAttrName)
    }
  }, [widgetProps, _finalAttrName])

  const renderSetter = useMemo(() => {
    return Comp ? (
      <div
        css={applySetterPublicWrapperStyle(
          isSetterSingleRowWrapper,
          useCustomLayout,
        )}
      >
        <Comp
          {...props}
          attrName={_finalAttrName}
          isSetterSingleRow={isSetterSingleRowWrapper}
          value={finalValue}
          panelConfig={widgetProps}
          handleUpdateDsl={handleUpdateDsl}
          handleUpdateMultiAttrDSL={handleUpdateMultiAttrDSL}
          handleUpdateOtherMultiAttrDSL={handleUpdateOtherMultiAttrDSL}
          widgetDisplayName={widgetDisplayName}
          expectedType={expectedType}
          widgetType={widgetType}
          parentAttrName={parentAttrName}
          widgetOrAction={widgetOrAction}
          defaultValue={defaultValue}
          icon={icon}
          componentNode={componentNode!}
          isGuideMode={isGuideMode}
        />
      </div>
    ) : null
  }, [
    Comp,
    isSetterSingleRowWrapper,
    useCustomLayout,
    props,
    _finalAttrName,
    finalValue,
    widgetProps,
    handleUpdateDsl,
    handleUpdateMultiAttrDSL,
    handleUpdateOtherMultiAttrDSL,
    widgetDisplayName,
    expectedType,
    widgetType,
    parentAttrName,
    widgetOrAction,
    defaultValue,
    icon,
    componentNode,
    isGuideMode,
  ])

  return canRenderSetter ? (
    <div css={applySetterWrapperStyle(isSetterSingleRow, useCustomLayout)}>
      {renderLabel}
      {renderSetter}
    </div>
  ) : null
})

Setter.displayName = "Setter"
