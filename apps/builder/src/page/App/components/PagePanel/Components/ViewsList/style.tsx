import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const viewsListWrapperStyle = css`
  display: flex;
  flex-direction: column;
  border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  border-radius: 8px;
  overflow: hidden;
`

export const viewsListHeaderWrapperStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 287px;
  height: 40px;
  padding: 8px 8px 8px 16px;
  background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
`
export const viewsListBodyWrapperStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const headerLabelStyle = css`
  font-size: 14px;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const headerAddIconStyle = css`
  width: 8px;
  height: 8px;
`

export const labelNameAndDragIconWrapperStyle = css`
  display: flex;
  align-items: center;
`

export const selectedIconAndLabelNameWrapperStyle = css`
  display: flex;
  max-width: 191px;
  align-items: center;
  gap: 8px;
`

export const selectedIconStyle = (isSelected: boolean) => {
  return css`
    width: 16px;
    height: 16px;
    border: ${isSelected
      ? `4px solid ${globalColor(`--${illaPrefix}-techPurple-01`)}`
      : `2px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)}`};
    border-radius: 50%;
  `
}

export const labelNameStyle = css`
  max-width: 147px;
  font-size: 14px;
  font-weight: 400;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  overflow: hidden;
  text-overflow: ellipsis;
`

export const moveIconStyle = css`
  cursor: move;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  width: 16px;
  height: 16px;
  visibility: hidden;
`

export const deleteIconStyle = css`
  cursor: pointer;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  width: 16px;
  height: 16px;
`

export const itemWrapperStyle = css`
  display: flex;
  width: 287px;
  justify-content: space-between;
  align-items: center;
  padding: 9px 16px 9px 0;
  gap: 4px;
  height: 40px;
  cursor: pointer;
  :hover {
    .dragIcon {
      visibility: visible;
    }
  }
`
