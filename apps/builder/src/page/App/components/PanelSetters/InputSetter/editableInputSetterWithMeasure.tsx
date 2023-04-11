import { FC, FocusEvent, useCallback } from "react"
import { Input } from "@illa-design/react"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@/illa-public-component/MixpanelUtils/interface"
import { EditableInputSetterProps } from "@/page/App/components/PanelSetters/InputSetter/interface"
import {
  editableInputIconStyle,
  editableInputSetterStyle,
} from "@/page/App/components/PanelSetters/InputSetter/style"
import { trackInEditor } from "@/utils/mixpanelHelper"

const valueWithMeasureRegex = /^\d+(\.\d+)?(px|vh|vw|%|em|rem|cm|mm|in|pt|pc)$/

export const EditableInputWithMeasureSetter: FC<EditableInputSetterProps> = (
  props,
) => {
  const { value, handleUpdateDsl, attrName, icon, widgetType } = props

  const fixInputValueWhenBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      let currentValue = e.target.value.toLocaleLowerCase().replace(/\s*/g, "")
      if (currentValue && !valueWithMeasureRegex.test(currentValue)) {
        const decimalArr = currentValue.match(/\d+(\.\d+)?/g)
        if (decimalArr) currentValue = decimalArr.join("") + "px"
      }
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.BLUR, {
        element: "component_inspect_code_mirror",
        parameter1: widgetType,
        parameter2: attrName,
        parameter3: currentValue.length,
      })
      handleUpdateDsl(attrName, currentValue)
    },
    [attrName, handleUpdateDsl, widgetType],
  )

  const onFocus = useCallback(() => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.FOCUS, {
      element: "component_inspect_code_mirror",
      parameter1: widgetType,
      parameter2: attrName,
    })
  }, [attrName, widgetType])

  return (
    <div css={editableInputSetterStyle}>
      {icon ? <div css={editableInputIconStyle}>{icon}</div> : null}
      <div style={{ width: "130px" }}>
        <Input
          variant="fill"
          colorScheme="techPurple"
          value={value}
          onChange={(value) => {
            handleUpdateDsl(attrName, value)
          }}
          onFocus={onFocus}
          onBlur={fixInputValueWhenBlur}
        />
      </div>
    </div>
  )
}
