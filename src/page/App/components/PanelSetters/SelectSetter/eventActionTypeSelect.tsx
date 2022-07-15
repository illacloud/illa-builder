import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Select } from "@illa-design/select"
import { get } from "lodash"
import { BaseSelectSetterProps } from "./interface"
import { applyBaseSelectWrapperStyle } from "@/page/App/components/PanelSetters/SelectSetter/style"
import { useSelector } from "react-redux"
import { getWidgetExecutionResult } from "@/redux/currentApp/executionTree/execution/executionSelector"
import { getSelectedAction } from "@/redux/config/configSelector"

export const EventActionTypeSelect: FC<BaseSelectSetterProps> = (props) => {
  const {
    isSetterSingleRow,
    attrName,
    parentAttrName,
    handleUpdateDsl,
    value,
    widgetDisplayName,
    options,
    widgetOrAction,
  } = props

  const { t } = useTranslation()
  const widgetDisplayNameMapProps = useSelector(getWidgetExecutionResult)
  const selectedAction = useSelector(getSelectedAction)

  const oldEvent = useMemo(() => {
    if (widgetOrAction === "WIDGET") {
      return get(
        widgetDisplayNameMapProps,
        `${widgetDisplayName}.${parentAttrName}`,
        {},
      )
    } else {
      return get(selectedAction, `actionTemplate.${parentAttrName}`, {})
    }
  }, [
    widgetDisplayNameMapProps,
    parentAttrName,
    selectedAction,
    widgetOrAction,
  ])

  const _finalAttrPath = parentAttrName ? parentAttrName : attrName

  const finalOptions = options.map((item: Record<string, any>) => {
    return { ...item, label: t(item.label) }
  })

  return (
    <div css={applyBaseSelectWrapperStyle(isSetterSingleRow)}>
      <Select
        options={finalOptions}
        size="small"
        value={value}
        onChange={(value) => {
          handleUpdateDsl(_finalAttrPath, {
            actionType: value,
            id: oldEvent?.id,
            eventType: oldEvent?.eventType,
          })
        }}
      />
    </div>
  )
}
EventActionTypeSelect.displayName = "EventActionTypeSelect"
