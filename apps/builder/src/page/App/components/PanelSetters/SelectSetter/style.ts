import { SerializedStyles, css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import { fixedWidthStyle } from "@/page/App/components/PanelSetters/style"

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

export const shadowSelectWrapperStyle = css`
  width: 154px;
  padding: 0 8px;
  border-radius: 8px;
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: ${getColor("grayBlue", "09")};
  }
`

export const shadowSelectStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const shadowIconHotSpotStyle = css`
  flex: none;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  display: flex;
`
