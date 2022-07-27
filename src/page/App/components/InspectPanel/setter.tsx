import { FC, useContext, useMemo } from "react"
import { get } from "lodash"
import { applySetterWrapperStyle, applySetterPublicWrapperStyle } from "./style"
import { PanelSetterProps } from "./interface"
import { getSetterByType } from "@/page/App/components/PanelSetters"
import { PanelLabel } from "./label"
import { SelectedPanelContext } from "@/page/App/components/InspectPanel/context/selectedContext"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

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
    expectedType,
    defaultValue,
    iconName,
  } = props
  const Comp = getSetterByType(setterType)

  const {
    widgetProps,
    handleUpdateDsl,
    widgetDisplayName,
    widgetType,
    widgetOrAction,
  } = useContext(SelectedPanelContext)

  const canRenderSetter = useMemo(() => {
    if (!bindAttrName || !shown) return true
    let bindAttrNameValue
    if (typeof bindAttrName === "string") {
      if (parentAttrName) {
        bindAttrNameValue = get(
          widgetProps,
          `${parentAttrName}.${bindAttrName}`,
        )
      } else {
        bindAttrNameValue = get(widgetProps, bindAttrName)
      }
      return shown(bindAttrNameValue)
    } else if (Array.isArray(bindAttrName)) {
      const shownProps: { [attrName: string]: any } = {}
      bindAttrName.forEach((_attrName: string) => {
        shownProps[_attrName] = widgetProps[_attrName]
      })
      return shown(shownProps)
    }
    return true
  }, [shown, widgetProps, bindAttrName])

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

  const renderSetter = useMemo(() => {
    const value = get(widgetProps, _finalAttrName)
    return Comp ? (
      <div
        css={applySetterPublicWrapperStyle(isInList, isSetterSingleRowWrapper)}
      >
        <Comp
          {...props}
          attrName={_finalAttrName}
          isSetterSingleRow={isSetterSingleRowWrapper}
          value={value}
          panelConfig={widgetProps}
          handleUpdateDsl={handleUpdateDsl}
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
    props,
    widgetProps,
    attrName,
    handleUpdateDsl,
    isSetterSingleRowWrapper,
    _finalAttrName,
    widgetDisplayName,
    expectedType,
    isInList,
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
