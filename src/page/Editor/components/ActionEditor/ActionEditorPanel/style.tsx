import chroma from "chroma-js"
import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const containerCss = css`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const panelScrollCss = css`
  overflow: auto;
  flex: 1;
`

export const headerCss = css`
  display: flex;
  align-items: center;
  padding: 8px 16px 8px 0;
  height: 48px;
  border-bottom: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  box-sizing: border-box;
`

export const titleContainerCss = css`
  display: flex;
  align-items: center;
  width: 280px;
  max-width: 280px;
  border-radius: 8px;
  box-sizing: border-box;
  height: 32px;
  line-height: 32px;
  transition: all 0.2s ease-in-out;
  padding: 0 19px 0 16px;

  &:hover {
    cursor: pointer;
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};

    & > svg {
      opacity: 1;
    }
  }
`

export const titleInputContainerCss = css`
  width: 280px;
  max-width: 280px;
  border-radius: 8px;
  box-sizing: border-box;
  height: 32px;
  padding: 0px 19px 0 16px;
`

export const titleInputCss = css`
  & > span {
    border-color: ${globalColor(`--${illaPrefix}-techPurple-01`)}!important;
    box-shadow: 0 0 8px 0
      ${chroma(globalColor(`--${illaPrefix}-techPurple-01`))
    .alpha(0.2)
    .hex()};
  }
`

export const titleCss = css`
  display: inline-block;
  max-width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const titleEditIconCss = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
  transition: all 0.2s ease-in-out;
  opacity: 0;
`

export const actionCss = css`
  display: flex;
  align-items: center;
  padding: 8px 16px;
`

export const resourceBarCss = css`
  margin-top: 8px;
  margin-bottom: 8px;
`

export const fillingCss = css`
  flex: 1;
`

export const headerButtonCss = css`
  box-sizing: border-box;
  font-size: 14px !important;

  & * {
    font-size: 14px !important;
  }
`

export const moreBtnCss = css`
  margin-right: 8px;
`

export const runBtnCss = css`
  color: ${globalColor(`--${illaPrefix}-techPurple-02`)}!important;
  background-color: ${globalColor(`--${illaPrefix}-techPurple-07`)}!important;

  &:hover {
    background-color: ${globalColor(`--${illaPrefix}-techPurple-06`)}!important;
  }
`

export const actionSelectCss = css`
  height: 32px;
  font-size: 14px;

  & > div {
    padding: 0 16px;
  }
`

export const triggerSelectCss = css`
  max-width: 313px;
  margin-right: 8px;
  border-radius: 8px !important;
`
export const resourceSelectContainerCss = css``

export const resourceSelectCss = css`
  min-width: 151px !important;
  max-width: 151px;
  border-radius: 8px 0 0 8px !important;
`

export const resourceOptionCss = css`
  overflow: hidden;
  text-overflow: ellipsis;
`

export function applyEditIconCss(disabled: boolean): SerializedStyles {
  const hoverCss = disabled
    ? ""
    : css`
        &:hover > svg {
          color: ${globalColor(`--${illaPrefix}-grayBlue-06`)};
        }
      `

  const cursorCss = disabled ? "cursor: not-allowed;" : "cursor: pointer;"

  return css`
    width: 32px;
    height: 32px;
    border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
    border-radius: 0 8px 8px 0;
    box-sizing: border-box;

    ${cursorCss}
    ${hoverCss}
    & > svg {
      margin: 8px;
      color: ${globalColor(`--${illaPrefix}-grayBlue-08`)};
    }
  `
}

export const sectionTitleCss = css`
  font-size: 14px;
  line-height: 1.57;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const handlerTitleCss = css`
  ${sectionTitleCss};
  color: ${globalColor(`--${illaPrefix}-grayBlue-06`)};
  padding: 16px 16px 0;
`

export const panelPaddingCss = css`
  padding: 8px 16px;
`

export const panelSubBarCss = css`
  padding: 13px 16px;
`
export const newBtnCss = css`
  padding-left: 16px;
`

export const dashBorderBottomCss = css`
  border-bottom: 1px dashed ${globalColor(`--${illaPrefix}-grayBlue-07`)};
`

export const gridHandlersCss = css`
  display: grid;
  gap: 8px;
  padding: 0 16px 8px;
`

export const handlerMoreIconCss = css`
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: 0 9px;
  box-sizing: border-box;
  border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 14px;
  white-space: nowrap;
  cursor: pointer;
  color: ${globalColor(`--${illaPrefix}-grayBlue-01`)};
  background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  &:hover {
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  }
`

export const moreListCss = css`
  list-style: none;
  margin: 0;
  padding: 8px 0;
  width: 184px;
`

export const moreListItemCss = css`
  padding: 5px 16px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.57;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  &:hover {
    background: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  }
`

export const moreListItemWarnCss = css`
  ${moreListItemCss};
  color: ${globalColor(`--${illaPrefix}-red-03`)};
`

export const moreBtnMenuCss = css`
  width: 180px;
`

export const duplicateActionCss = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)}!important;
`

export const deleteActionCss = css`
  color: ${globalColor(`--${illaPrefix}-red-03`)}!important;
`

export const handlerItemWrapperCss = css`
  display: flex;
  height: 32px;
  font-size: 14px;
  line-height: 1.57;
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
  cursor: pointer;
`

export const handlerItemContentCss = css`
  flex: 1;
  border-right: solid 1px ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  padding: 5px 16px;
  border: solid 1px ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  &:hover {
    border-color: ${globalColor(`--${illaPrefix}-blue-06`)};
  }
`

export const handlerItemMoreCss = css`
  width: 32px;
  height: 100%;
  display: inline-flex;
  align-items: center;
  padding: 0 9px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border: solid 1px ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  border-left-width: 0;
  &:hover {
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  }
`
