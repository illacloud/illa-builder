import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { FC, useCallback } from "react"
import { Select } from "@illa-design/react"
import { applyBaseSelectWrapperStyle } from "@/page/App/components/PanelSetters/SelectSetter/style"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { BaseSelectSetterProps } from "./interface"

const BaseSelectSetter: FC<BaseSelectSetterProps> = (props) => {
  const {
    isSetterSingleRow,
    options,
    attrName,
    handleUpdateDsl,
    value,
    allowClear,
    defaultValue,
    onChange,
    widgetType,
    showSearch,
  } = props

  const onClick = useCallback(() => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "component_inspect_select",
      parameter1: widgetType,
      parameter2: attrName,
    })
  }, [attrName, widgetType])

  return (
    <div css={applyBaseSelectWrapperStyle(isSetterSingleRow)}>
      <Select
        options={options}
        size="medium"
        defaultValue={defaultValue}
        value={value}
        colorScheme="techPurple"
        onChange={(value) => {
          handleUpdateDsl(attrName, value)
          onChange?.(value)
          trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CHANGE, {
            element: "component_inspect_select",
            parameter1: widgetType,
            parameter2: attrName,
            parameter3: value,
          })
        }}
        allowClear={allowClear}
        showSearch={showSearch}
        onClick={onClick}
      />
    </div>
  )
}

BaseSelectSetter.displayName = "BaseSelect"

export default BaseSelectSetter
