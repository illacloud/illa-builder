import { SerializedStyles, css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const chartDataSetterContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 16px;
`

export const ListItemWrapperCss = css`
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  :hover {
    #eyeOnIcon {
      visibility: visible;
    }
  }
`

export const applySingleColorAreaStyle = (color: string) => {
  return css`
    width: 24px;
    height: 24px;
    border-radius: 12px;
    background-color: ${color};
    border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  `
}

export const listItemInfoAreaStyle = css`
  height: 100%;
  width: 200px;
  display: flex;
  align-items: center;
  padding-right: 8px;
  border-radius: 8px;
  cursor: pointer;
  :hover {
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  }
`

export const applyListItemDataNameAreaStyle = (
  isHidden: boolean,
): SerializedStyles => {
  return css`
    width: 80px;
    white-space: nowrap;
    line-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 8px;
    font-size: 14px;
    flex: none;
    color: ${isHidden
      ? globalColor(`--${illaPrefix}-grayBlue-05`)
      : globalColor(`--${illaPrefix}-grayBlue-02`)};
  `
}

export const applyListItemMethodAreaStyle = (
  isHidden: boolean,
): SerializedStyles => {
  return css`
    width: 64px;
    line-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    flex: none;
    color: ${isHidden
      ? globalColor(`--${illaPrefix}-grayBlue-05`)
      : globalColor(`--${illaPrefix}-grayBlue-03`)};
  `
}

export const baseIconStyle = css`
  font-size: 16px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  cursor: pointer;
  :hover {
    color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  }
`

export const eyeIconStyle = css`
  visibility: hidden;
  ${baseIconStyle}
`

export const listItemActionAreaStyle = css`
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const colorToneWrapperStyle = css`
  width: 24px;
  height: 12px;
  border-radius: 2px;
  display: flex;
  overflow: hidden;
`

export const applyColorToneStyle = (color: string) => {
  return css`
    width: 100%;
    height: 100%;
    background-color: ${color};
  `
}

export const editModalStyle = css`
  width: 272px;
`
