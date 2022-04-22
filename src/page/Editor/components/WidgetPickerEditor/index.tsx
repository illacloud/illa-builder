import { FC, HTMLAttributes } from "react"

interface WidgetPickerEditorProps extends HTMLAttributes<HTMLDivElement> {}

export const WidgetPickerEditor: FC<WidgetPickerEditorProps> = (props) => {
  const { className } = props

  return <div className={className}>WidgetPickerEditor</div>
}

WidgetPickerEditor.displayName = "WidgetPickerEditor"
