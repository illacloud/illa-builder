import { FC, useEffect, useState } from "react"
import { PanelLabel } from "@/page/App/components/InspectPanel/label"
import { BaseInput } from "@/page/App/components/PanelSetters/InputSetter/baseInput"
import { DateRangeValueSetterProps } from "./interface"
import { setterContainerStyle } from "./style"

const START_DATE_KEY = "start-date"
const END_DATE_KEY = "end-date"

export const DateRangeValueSetter: FC<DateRangeValueSetterProps> = (props) => {
  const { attrName, panelConfig, handleUpdateDsl, widgetDisplayName } = props

  const [values, setValues] = useState<string[]>(panelConfig[attrName])

  useEffect(() => {
    setValues([panelConfig[START_DATE_KEY], panelConfig[END_DATE_KEY]])
  }, [panelConfig[START_DATE_KEY], panelConfig[END_DATE_KEY]])

  useEffect(() => {
    handleUpdateDsl(attrName, values)
  }, [values])

  return (
    <>
      <div css={setterContainerStyle}>
        <PanelLabel labelName="Start date" />
        <BaseInput
          attrName={START_DATE_KEY}
          panelConfig={panelConfig}
          handleUpdateDsl={handleUpdateDsl}
          expectedType={S}
          widgetDisplayName={widgetDisplayName}
        />
      </div>
      <div css={setterContainerStyle}>
        <PanelLabel labelName="End date" />
        <BaseInput
          attrName={END_DATE_KEY}
          panelConfig={panelConfig}
          handleUpdateDsl={handleUpdateDsl}
          expectedType="String"
          widgetDisplayName={widgetDisplayName}
        />
      </div>
    </>
  )
}

BaseInput.displayName = "BaseInput"
