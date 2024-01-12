import { convertPathToString } from "@illa-public/dynamic-string"
import { get, toPath } from "lodash-es"
import { memo, useContext, useMemo } from "react"
import { useSelector } from "react-redux"
import { getSetterByType } from "@/page/App/components/InspectPanel/PanelSetters"
import { SelectedPanelContext } from "@/page/App/components/InspectPanel/context/selectedContext"
import { getComponentNodeBySingleSelected } from "@/redux/currentApp/components/componentsSelector"
import { getGuideStatus } from "@/redux/guide/guideSelector"
import { PanelSetterProps } from "./interface"
import { applySetterWrapperStyle } from "./style"

export const Setter = memo<PanelSetterProps>((props: PanelSetterProps) => {
  const {
    setterType,
    isSetterSingleRow,
    labelName,
    useCustomLayout = false,
    shown,
    bindAttrName,
    attrName,
    parentAttrName,
    expectedType,
    defaultValue,
    icon,
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
    handleUpdateExecutionResult,
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

  return canRenderSetter ? (
    <div css={applySetterWrapperStyle(isSetterSingleRow, useCustomLayout)}>
      {Comp ? (
        <Comp
          {...props}
          attrName={_finalAttrName}
          isSetterSingleRow={isSetterSingleRowWrapper}
          value={finalValue}
          panelConfig={widgetProps}
          handleUpdateDsl={handleUpdateDsl}
          handleUpdateMultiAttrDSL={handleUpdateMultiAttrDSL}
          handleUpdateOtherMultiAttrDSL={handleUpdateOtherMultiAttrDSL}
          handleUpdateExecutionResult={handleUpdateExecutionResult}
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
      ) : null}
    </div>
  ) : null
})

Setter.displayName = "Setter"
