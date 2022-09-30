import { useContext, useMemo, memo } from "react"
import { get } from "lodash"
import { applySetterWrapperStyle, applySetterPublicWrapperStyle } from "./style"
import { PanelSetterProps } from "./interface"
import { getSetterByType } from "@/page/App/components/PanelSetters"
import { PanelLabel } from "./label"
import { SelectedPanelContext } from "@/page/App/components/InspectPanel/context/selectedContext"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

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
    parentAttrName,
    expectedType,
    defaultValue,
    iconName,
  } = props
  const Comp = getSetterByType(setterType)

  const {
    widgetProps,
    widgetDisplayName,
    widgetType,
    widgetOrAction,
    handleUpdateDsl,
    handleUpdateMultiAttrDSL,
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

  const isSetterSingleRowWrapper = useMemo(() => {
    return isSetterSingleRow || !labelName
  }, [isSetterSingleRow, labelName])

  const finalValue = useMemo(
    () => get(widgetProps, _finalAttrName),
    [widgetProps, _finalAttrName],
  )

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
          panelConfig={widgetProps}
          handleUpdateDsl={handleUpdateDsl}
          handleUpdateMultiAttrDSL={handleUpdateMultiAttrDSL}
          widgetDisplayName={widgetDisplayName}
          expectedType={expectedType ?? VALIDATION_TYPES.STRING}
          widgetType={widgetType}
          parentAttrName={parentAttrName}
          widgetOrAction={widgetOrAction}
          defaultValue={defaultValue}
          iconName={iconName}
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
    widgetProps,
    handleUpdateDsl,
    handleUpdateMultiAttrDSL,
    widgetDisplayName,
    expectedType,
    widgetType,
    parentAttrName,
    widgetOrAction,
    defaultValue,
    iconName,
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
