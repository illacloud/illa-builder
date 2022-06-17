import chroma from "chroma-js"
import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const actionListContainerStyle = css`
  display: flex;
  flex-direction: column;
  width: 255px;
  border-right: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  position: relative;
`

export const newBtnContainerStyle = css`
  margin: 0 16px 8px 16px;
`

export const applynewButtonStyle = (isActive: boolean): SerializedStyles => {
  const activeStyle = css`
    background-color: ${globalColor(`--${illaPrefix}-techPurple-05`)}!important;
  `

  return css`
    background-color: ${globalColor(`--${illaPrefix}-techPurple-07`)}!important;
    color: ${globalColor(`--${illaPrefix}-techPurple-01`)}!important;
    justify-content: center;
    font-size: 14px;
    margin: 0 16px 8px 16px;
    border-radius: 8px !important;
    line-height: 32px;
    flex-shrink: 0;

    ${isActive && activeStyle}

    transition: background-color .2s ease-in-out;

    & > * {
      font-size: 14px !important;
    }

    &:hover {
      background-color: ${globalColor(
        `--${illaPrefix}-techPurple-06`,
      )}!important;
    }
  `
}

export const newButtonTextStyle = css`
  display: flex;
  align-items: center;
`

export const actionItemListStyle = css`
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
`

export function applyactionItemStyle(isSelected: boolean): SerializedStyles {
  const backgroundColorStyle = css`
    background: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  `

  const selectedBackgroundColorStyle = css`
    background: ${globalColor(`--${illaPrefix}-techPurple-07`)};
  `

  return css`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 9px 16px;
    height: 40px;
    user-select: none;

    &:hover {
      ${backgroundColorStyle}
    }

    ${isSelected && selectedBackgroundColorStyle}
  `
}

export const actionItemIconStyle = css`
  position: relative;
  display: flex;
  color: ${globalColor(`--${illaPrefix}-grayBlue-07`)};
`

export const actionItemNameStyle = css`
  flex: 1 1 0;
  display: flex;
  align-items: center;
  margin-left: 8px;
  max-width: 164px;
  overflow: hidden;
  margin-right: 8px;
`

export function applyactionItemNameTextStyle(
  isWarning: boolean,
): SerializedStyles {
  const warningColor = css`
    color: ${globalColor(`--${illaPrefix}-red-03`)};
  `
  return css`
    color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
    ${isWarning && warningColor}
  `
}

export const warningIndicatorStyle = css`
  position: absolute;
  color: ${globalColor(`--${illaPrefix}-orange-06`)};
  bottom: 0;
  right: 0;

  & > path:last-child {
    fill: ${globalColor(`--${illaPrefix}-orange-03`)};
  }
`

export const updatedIndicatorStyle = css`
  display: inline-block;
  height: 6px;
  width: 6px;
  border-radius: 50%;
  background-color: ${globalColor(`--${illaPrefix}-blue-03`)};
  margin-left: 8px;
  flex: 0 0 6px;
`
export const actionItemTimeStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-06`)};
`

export const newActionOptionsListStyle = css`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 220px;
`

export const newActionOptionsItemStyle = css`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 9px 16px;
  height: 40px;

  &:hover {
    background: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  }
`

export const noMatchFoundWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
  font-size: 14px;

  & > svg {
    margin-bottom: 8px;
  }
`

export const emptyActionListPlaceholderStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
  padding: 16px;
  margin: 0 16px;
  font-size: 14px;
  border: 2px dashed ${globalColor(`--${illaPrefix}-grayBlue-09`)};
`

export function applycontextMenuStyle(
  top?: number,
  left?: number,
): SerializedStyles {
  return css`
    position: fixed !important;
    top: ${top ?? 0}px;
    left: ${left ?? 0}px;
    margin: 0;
    padding: 0;
    width: 184px;
    border: solid 1px ${globalColor(`--${illaPrefix}-gray-08`)};
    box-shadow: 0 2px 16px 0 ${globalColor(`--${illaPrefix}-blackAlpha-05`)};
    border-radius: 8px;
    list-style: none;
    z-index: 1;
    background-color: ${globalColor(`--${illaPrefix}-white-01`)};
  `
}

export function applycontextMenuVisibleStyle(
  isVisible: boolean,
): SerializedStyles {
  if (isVisible) {
    return css`
      opacity: 1;
    `
  }

  return css`
    opacity: 0;
    top: -9999px;
  `
}

export const duplicateActionStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)}!important;
`

export const deleteActionStyle = css`
  color: ${globalColor(`--${illaPrefix}-red-03`)}!important;
`

export const searchHeaderStyle = css`
  width: 100%;
  height: 48px;
  display: flex;
  padding: 13px 16px;
  align-items: center;
  color: ${globalColor(`--${illaPrefix}-grayBlue-06`)};
`
export const searchHeaderInputStyle = css`
  justify-content: flex-end;
`

export const searchHeaderTitleStyle = css`
  justify-content: flex-start;
`

export const searchHeaderTitleTextStyle = css`
  white-space: nowrap;
  flex: 1;
`

export const searchHeaderTitleIconStyle = css`
  cursor: pointer;
  &:hover {
    color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
  }
`
export const searchInputStyle = css`
  margin-right: 8px;
  & > span {
    border-radius: 8px !important;
    border-color: ${globalColor(`--${illaPrefix}-techPurple-01`)}!important;
    box-shadow: 0 0 8px 0
      ${chroma(globalColor(`--${illaPrefix}-techPurple-01`))
        .alpha(0.2)
        .hex()};
  }
`

export const searchInputIconStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
`

export const searchInputCloseBtnStyle = css`
  flex: 0 0 45px;
  & > span {
    color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  }
`
