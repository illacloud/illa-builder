import { FC } from "react"
import { BaseInput } from "@/page/App/components/PanelSetters/InputSetter/baseInput"
import { InputWithSelectSetterProps } from "@/page/App/components/PanelSetters/InputSetter/interface"
import { inputWithSelectSetterStyle } from "@/page/App/components/PanelSetters/InputSetter/style"
import { BaseSelectSetter } from "@/page/App/components/PanelSetters/SelectSetter/baseSelect"

export const InputWithSelectSetter: FC<InputWithSelectSetterProps> = (
  props,
) => {
  const {
    attrName,
    attrNames,
    panelConfig,
    handleUpdateDsl,
    value,
    values,
    options,
    widgetDisplayName,
    widgetType,
    expectedType,
    widgetOrAction,
  } = props

  return (
    <div css={inputWithSelectSetterStyle}>
      <BaseInput
        attrName={attrName}
        value={value}
        handleUpdateDsl={handleUpdateDsl}
        panelConfig={panelConfig}
        expectedType={expectedType}
        isSetterSingleRow
        widgetDisplayName={widgetDisplayName}
        widgetType={widgetType}
        widgetOrAction={widgetOrAction}
      />
      <BaseSelectSetter
        expectedType={expectedType}
        panelConfig={panelConfig}
        widgetDisplayName={widgetDisplayName}
        widgetType={widgetType}
        widgetOrAction={widgetOrAction}
        isSetterSingleRow
        value={values[1]}
        options={options}
        attrName={attrNames?.[1] || attrName}
        handleUpdateDsl={handleUpdateDsl}
      />
    </div>
  )
}
InputWithSelectSetter.displayName = "InputWithSelectSetter"
