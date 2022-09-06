import { FC, HTMLAttributes } from "react"
import ComponentsManager from "./componentManager"
import { FocusManager } from "@/utils/focusManager"

interface WidgetPickerEditorProps extends HTMLAttributes<HTMLDivElement> {}

export const WidgetPickerEditor: FC<WidgetPickerEditorProps> = (props) => {
  const { className } = props

  return (
    <div
      className={className}
      onFocus={() => {
        FocusManager.switchFocus("components")
      }}
    >
      <ComponentsManager />
    </div>
  )
}

WidgetPickerEditor.displayName = "WidgetPickerEditor"
