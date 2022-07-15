import { FC, useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import { Select } from "@illa-design/select"
import { applyBaseSelectWrapperStyle } from "@/page/App/components/PanelSetters/SelectSetter/style"
import {
  getAllActionDisplayNameMapProps,
  SELECTED_ACTION_DISPALY_NAME,
} from "@/redux/currentApp/action/actionSelector"
import { BaseSelectSetterProps } from "./interface"

export const EventTargetActionSelect: FC<BaseSelectSetterProps> = (props) => {
  const { isSetterSingleRow, attrName, handleUpdateDsl, value } = props

  const actionDisplayNameMapProps = useSelector(getAllActionDisplayNameMapProps)

  const finalOptions = useMemo(() => {
    const tmpOptions: { label: string; value: string }[] = []
    Object.keys(actionDisplayNameMapProps).forEach((key) => {
      if (key !== SELECTED_ACTION_DISPALY_NAME) {
        tmpOptions.push({
          label: key,
          value: key,
        })
      }
    })
    return tmpOptions
  }, [actionDisplayNameMapProps])

  const finalValue = useMemo(() => {
    const index = finalOptions.findIndex((option) => {
      return option.value === value
    })
    if (index !== -1) return value
    return undefined
  }, [finalOptions, attrName, value])

  useEffect(() => {
    if (finalValue === undefined) {
      handleUpdateDsl(attrName, undefined)
    }
  }, [finalValue, attrName])

  return (
    <div css={applyBaseSelectWrapperStyle(isSetterSingleRow)}>
      <Select
        options={finalOptions}
        size="medium"
        value={finalValue}
        onChange={(value) => {
          handleUpdateDsl(attrName, value)
        }}
      />
    </div>
  )
}
