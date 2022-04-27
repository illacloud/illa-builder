import { FC, HTMLAttributes } from "react"
import ComponentsManager from "@/page/Editor/components/WidgetPickerEditor/componentManager"

interface WidgetPickerEditorProps extends HTMLAttributes<HTMLDivElement> {}

export const WidgetPickerEditor: FC<WidgetPickerEditorProps> = (props) => {
  const { className } = props

  return (
    <div className={className}>
      WidgetPickerEditor
      <ComponentsManager />
    </div>
  )
}

WidgetPickerEditor.displayName = "WidgetPickerEditor"
