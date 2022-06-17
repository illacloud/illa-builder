import { css, SerializedStyles } from "@emotion/react"
import { applySetterStyle } from "@/page/App/components/PanelSetters/style"

export const applyInputSetterWrapperStyle = (
  isFullWidth: boolean = false,
  isInList: boolean = false,
): SerializedStyles => {
  return isInList
    ? css`
        width: 100%;
      `
    : applySetterStyle(isFullWidth)
}

export const applyInputSetterStyle = css`
  width: 100%;
`
