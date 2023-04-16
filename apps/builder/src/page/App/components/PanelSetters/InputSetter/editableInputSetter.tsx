import { FC, FocusEvent, useCallback } from "react"
import { Input } from "@illa-design/react"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@/illa-public-component/MixpanelUtils/interface"
import { EditableInputSetterProps } from "@/page/App/components/PanelSetters/InputSetter/interface"
import {
  editableInputIconStyle,
  editableInputSetterStyle,
} from "@/page/App/components/PanelSetters/InputSetter/style"
import { trackInEditor } from "@/utils/mixpanelHelper"

export const EditableInputSetter: FC<EditableInputSetterProps> = (props) => {
  const { value, handleUpdateDsl, attrName, icon, widgetType } = props

  const onFocus = useCallback(() => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.FOCUS, {
      element: "component_inspect_code_mirror",
      parameter1: widgetType,
      parameter2: attrName,
    })
  }, [attrName, widgetType])

  const onBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.BLUR, {
        element: "component_inspect_code_mirror",
        parameter1: widgetType,
        parameter2: attrName,
        parameter3: e.target.value?.length ?? 0,
      })
    },
    [attrName, widgetType],
  )
  return (
    <div css={editableInputSetterStyle}>
      {icon ? <div css={editableInputIconStyle}>{icon}</div> : null}
      <div style={{ width: "130px" }}>
        <Input
          colorScheme="techPurple"
          value={value}
          onChange={(value) => {
            handleUpdateDsl(attrName, value)
          }}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
    </div>
  )
}
