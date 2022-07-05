import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { fixedWidthStyle } from "@/page/App/components/PanelSetters/style"

export const colorSelectWrapperStyle = css`
  height: 100%;
  padding: 8px;
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;

  :hover {
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  }
`

export const applyColorSelectPreviewColorStyle = (
  color: string,
): SerializedStyles => {
  return css`
    width: 24px;
    height: 24px;
    border-radius: 12px;
    border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-09`)};
    background-color: ${color};
    box-sizing: border-box;
    display: inline-block;
    vertical-align: middle;
  `
}

export const colorSelectPreviewNameStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  margin-left: 8px;
  display: inline-block;
  width: 56px;
  font-size: 12px;
`

export const colorSelectMenuWrapperStyle = css`
  width: 120px;
  padding: 8px 0;
`

export const colorSelectMenuItemWrapperStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 34px;
  cursor: pointer;

  :hover {
    background-color: ${globalColor(`--${illaPrefix}-techPurple-07`)};
  }
`

export const applyBaseSelectWrapperStyle = (
  isSetterSingleRow: boolean = false,
): SerializedStyles => {
  return isSetterSingleRow
    ? css`
        width: 100%;
      `
    : fixedWidthStyle
}
