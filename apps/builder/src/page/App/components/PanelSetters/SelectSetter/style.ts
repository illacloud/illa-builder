import { fixedWidthStyle } from "@/page/App/components/PanelSetters/style"
import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const applyBaseSelectWrapperStyle = (
  isSetterSingleRow: boolean = false,
): SerializedStyles => {
  return isSetterSingleRow
    ? css`
        width: 100%;
      `
    : fixedWidthStyle
}

export const dynamicSelectHeaderStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 40px;
`

export const dynamicSelectSetterStyle = css`
  min-height: 40px;
  width: 100%;
`
