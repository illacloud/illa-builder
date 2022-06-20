import { FC, useEffect, useState } from "react"
import { PanelLabel } from "@/page/App/components/InspectPanel/label"
import { BaseInput } from "@/page/App/components/PanelSetters/InputSetter/baseInput"
import { DateRangeValueSetterProps } from "./interface"
import { setterContainerStyle } from "./style"

const START_DATE_KEY = "start-date"
const END_DATE_KEY = "end-date"

export const DateRangeValueSetter: FC<DateRangeValueSetterProps> = (props) => {
  const { attrName, panelConfig, handleUpdateDsl } = props

  const [values, setValues] = useState<string[]>(panelConfig[attrName])

  useEffect(() => {
    setValues([panelConfig[START_DATE_KEY], panelConfig[END_DATE_KEY]])
  }, [panelConfig[START_DATE_KEY], panelConfig[END_DATE_KEY]])

  useEffect(() => {
    handleUpdateDsl({ [attrName]: values })
  }, [values])

  return (
    <>
      <div css={setterContainerStyle}>
        <PanelLabel labelName="Start date" />
        <BaseInput
          defaultValue={panelConfig[attrName]?.[0]}
          attrName={START_DATE_KEY}
          panelConfig={panelConfig}
          handleUpdateDsl={handleUpdateDsl}
          expectedType="String"
        />
      </div>
      <div css={setterContainerStyle}>
        <PanelLabel labelName="End date" />
        <BaseInput
          defaultValue={panelConfig[attrName]?.[1]}
          attrName={END_DATE_KEY}
          panelConfig={panelConfig}
          handleUpdateDsl={handleUpdateDsl}
          expectedType="String"
        />
      </div>
    </>
  )
}

BaseInput.displayName = "BaseInput"
