import { FC } from "react"
import { FocusManager } from "@/utils/focusManager"

export const MultiSelectedPanel: FC = () => {
  return (
    <div
      onFocus={() => {
        FocusManager.switchFocus("inspect")
      }}
    >
      3 components selected
    </div>
  )
}

MultiSelectedPanel.displayName = "MultiSelectedPanel"
