import { FC, HTMLAttributes } from "react"
import { DemoWidget } from "./DemoWidget"
import { TestWidget } from "./TestWidget"
import ComponentsManager from "./componentManager"

interface WidgetPickerEditorProps extends HTMLAttributes<HTMLDivElement> {}

export const WidgetPickerEditor: FC<WidgetPickerEditorProps> = (props) => {
  const { className } = props

  return (
    <div className={className}>
      WidgetPickerEditor
      <DemoWidget />
      <TestWidget />
      <ComponentsManager />
    </div>
  )
}

WidgetPickerEditor.displayName = "WidgetPickerEditor"
