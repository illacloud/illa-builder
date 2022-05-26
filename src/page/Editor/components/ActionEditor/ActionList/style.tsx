import chroma from "chroma-js"
import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const actionListContainerCss = css`
  display: flex;
  flex-direction: column;
  width: 255px;
  border-right: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
`

export const applynewButtonCss = (isActive: boolean): SerializedStyles => {
  const activeCSS = css`
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

    ${isActive && activeCSS}

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

export const newButtonTextCss = css`
  display: flex;
  align-items: center;
`

export const newButtonIconCss = css`
  margin-right: 8px;
`

export const actionItemListCss = css`
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
`

export function applyactionItemCss(isSelected: boolean): SerializedStyles {
  const backgroundcolorCss = css`
    background: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  `
  return css`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 9px 16px;
    height: 40px;

    &:hover {
      ${backgroundcolorCss}
    }

    ${isSelected && backgroundcolorCss}
  `
}

export const actionItemIconCss = css`
  position: relative;
  color: ${globalColor(`--${illaPrefix}-grayBlue-07`)};
`

export const actionItemNameCss = css`
  flex: 1 1 0;
  display: flex;
  align-items: center;
  margin-left: 8px;
  max-width: 164px;
  overflow: hidden;
  margin-right: 8px;
`

export function applyactionItemNameTextCss(
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

export const warningIndicatorCss = css`
  position: absolute;
  color: ${globalColor(`--${illaPrefix}-orange-06`)};
  bottom: 0;
  right: 0;

  & > path:last-child {
    fill: ${globalColor(`--${illaPrefix}-orange-03`)};
  }
`

export const updatedIndicatorCss = css`
  display: inline-block;
  height: 6px;
  width: 6px;
  border-radius: 50%;
  background-color: ${globalColor(`--${illaPrefix}-blue-03`)};
  margin-left: 8px;
  flex: 0 0 6px;
`
export const actionItemTimeCss = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-06`)};
`

export const newActionOptionsListCss = css`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 220px;
`

export const newActionOptionsItemCss = css`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 9px 16px;
  height: 40px;

  &:hover {
    background: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  }
`

export const noMatchFoundWrapperCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
  font-size: 14px;

  & > svg {
    margin-bottom: 8px;
  }
`

export const emptyActionListPlaceholderCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
  padding: 16px;
  margin: 0 16px;
  font-size: 14px;
  border: 2px dashed ${globalColor(`--${illaPrefix}-grayBlue-09`)};
`

export function applycontextMenuCss(
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

export function applycontextMenuVisibleCss(
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

export const duplicateActionCss = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)}!important;
`

export const deleteActionCss = css`
  color: ${globalColor(`--${illaPrefix}-red-03`)}!important;
`

export const searchHeaderCss = css`
  width: 100%;
  height: 48px;
  display: flex;
  padding: 13px 16px;
  align-items: center;
  color: ${globalColor(`--${illaPrefix}-grayBlue-06`)};
`
export const searchHeaderInputCss = css`
  justify-content: flex-end;
`

export const searchHeaderTitleCss = css`
  justify-content: flex-start;
`

export const searchHeaderTitleTextCss = css`
  white-space: nowrap;
`

export const searchHeaderTitleIconCss = css`
  cursor: pointer;
  &:hover {
    color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
  }
`
export const searchInputCss = css`
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

export const searchInputIconCss = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
`

export const searchInputCloseBtnCss = css`
  & > span {
    color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  }
`
