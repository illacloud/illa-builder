import { FC, useEffect, useState } from "react"
import { PanelLabel } from "@/page/App/components/InspectPanel/label"
import { BaseInput } from "@/page/App/components/PanelSetters/InputSetter/baseInput"
import { DateRangeValueSetterProps } from "./interface"
import { setterContainerStyle } from "./style"

export const DateRangeValueSetter: FC<DateRangeValueSetterProps> = (props) => {
  const { attrName, panelConfig, handleUpdateDsl, handleUpdatePanelConfig } =
    props

  const startDateKey = "start-date"
  const endDateKey = "end-date"

  const [values, setValues] = useState<string[]>(panelConfig[attrName])

  useEffect(() => {
    setValues([panelConfig[startDateKey], panelConfig[endDateKey]])
  }, [panelConfig[startDateKey], panelConfig[endDateKey]])

  useEffect(() => {
    handleUpdateDsl({ [attrName]: values })
  }, [values])

  return (
    <>
      <div css={setterContainerStyle}>
        <PanelLabel labelName={"Start date"} />
        <BaseInput
          defaultValue={panelConfig[attrName]?.[0]}
          attrName={startDateKey}
          panelConfig={panelConfig}
          handleUpdateDsl={handleUpdateDsl}
          handleUpdatePanelConfig={handleUpdatePanelConfig}
        />
      </div>
      <div css={setterContainerStyle}>
        <PanelLabel labelName={"End date"} />
        <BaseInput
          defaultValue={panelConfig[attrName]?.[1]}
          attrName={endDateKey}
          panelConfig={panelConfig}
          handleUpdateDsl={handleUpdateDsl}
          handleUpdatePanelConfig={handleUpdatePanelConfig}
        />
      </div>
    </>
  )
}

BaseInput.displayName = "BaseInput"
