import React, { useContext, useEffect } from "react"
import { EditorInput } from "../../../../components/EditorInput"

export function WidgetPickerEditor() {
  return (
    <div>
      <span>WidgetPickerEditor</span>
      <EditorInput />
    </div>
  )
}

WidgetPickerEditor.displayName = "WidgetPickerEditor"
