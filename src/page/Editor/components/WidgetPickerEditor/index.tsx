import { FC, HTMLAttributes } from "react"
import { DemoWidget } from "./DemoWidget"

interface WidgetPickerEditorProps extends HTMLAttributes<HTMLDivElement> {}

export const WidgetPickerEditor: FC<WidgetPickerEditorProps> = (props) => {
  const { className } = props

  return (
    <div className={className}>
      WidgetPickerEditor
      <DemoWidget />
    </div>
  )
}

WidgetPickerEditor.displayName = "WidgetPickerEditor"
