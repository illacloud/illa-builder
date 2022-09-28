import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const reorderListStyle = css`
  ul,
  li {
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    height: 40px;
    padding: 9px 16px 9px 0;
    display: flex;
    justify-content: space-between;
    user-select: none;
    :hover {
      #dragIcon {
        visibility: visible;
      }
      #copyIcon {
        visibility: visible;
      }
    }
  }
`

export const listItemWrapperStyle = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const applyOptionStyle = (isSelect: boolean) => {
  return css`
    width: 16px;
    height: 16px;
    border-radius: 8px;
    border: ${isSelect
      ? `4px solid ${globalColor(`--${illaPrefix}-techPurple-01`)}`
      : `2px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)}`};
    cursor: pointer;
  `
}

export const labelAndDragIconWrapperStyle = css`
  display: flex;
  align-items: center;
  flex: 0;
`

export const labelWrapperStyle = css`
  display: flex;
  gap: 8px;
  align-items: center;
  white-space: nowrap;
`

export const actionWrapperStyle = css`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const iconStyle = css`
  cursor: pointer;
  width: 16px;
  height: 16px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`

export const copyIconStyle = css`
  ${iconStyle};
  visibility: hidden;
`

export const moveIconStyle = css`
  cursor: move;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  width: 16px;
  height: 16px;
  visibility: hidden;
`

export const listItemTriggerWrapperStyle = css`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`
