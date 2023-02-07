import { get } from "lodash"
import { memo, useContext, useMemo } from "react"
import { useSelector } from "react-redux"
import { SelectedPanelContext } from "@/page/App/components/InspectPanel/context/selectedContext"
import { getSetterByType } from "@/page/App/components/PanelSetters"
import { getComponentNodeBySingleSelected } from "@/redux/currentApp/editor/components/componentsSelector"
import { PanelSetterProps } from "./interface"
import { PanelLabel } from "./label"
import { applySetterPublicWrapperStyle, applySetterWrapperStyle } from "./style"

export const Setter = memo<PanelSetterProps>((props: PanelSetterProps) => {
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
    attrNames,
    parentAttrName,
    expectedType,
    defaultValue,
    icon,
  } = props
  const Comp = getSetterByType(setterType)
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

  const _finalAttrNames = useMemo(() => {
    return attrNames?.map((name) => {
      if (parentAttrName) {
        return `${parentAttrName}.${name}`
      }
      return name
    })
  }, [parentAttrName, attrNames])

  const isSetterSingleRowWrapper = useMemo(() => {
    return isSetterSingleRow || !labelName
  }, [isSetterSingleRow, labelName])

  const finalValue = useMemo(
    () => get(widgetProps, _finalAttrName),
    [widgetProps, _finalAttrName],
  )

  const finalValues = useMemo(() => {
    if (!_finalAttrNames) {
      return []
    }
    return _finalAttrNames.map((name) => get(widgetProps, name))
  }, [widgetProps, _finalAttrNames])

  const renderSetter = useMemo(() => {
    return Comp ? (
      <div
        css={applySetterPublicWrapperStyle(
          isInList,
          isSetterSingleRowWrapper,
          setterType === "LIST_SETTER" || setterType === "EVENT_HANDLER_SETTER",
        )}
      >
        <Comp
          {...props}
          attrName={_finalAttrName}
          isSetterSingleRow={isSetterSingleRowWrapper}
          value={finalValue}
          values={finalValues}
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
          componentNode={componentNode}
        />
      </div>
    ) : null
  }, [
    Comp,
    isInList,
    isSetterSingleRowWrapper,
    setterType,
    props,
    _finalAttrName,
    finalValue,
    finalValues,
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
})

Setter.displayName = "Setter"
