import chroma from "chroma-js"
import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const containerStyle = css`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const panelScrollStyle = css`
  overflow: auto;
  flex: 1;
  position: relative;
`

export const headerStyle = css`
  display: flex;
  align-items: center;
  padding: 8px 16px 8px 0;
  height: 48px;
  border-bottom: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  box-sizing: border-box;
`

export const titleContainerStyle = css`
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

export const titleInputContainerStyle = css`
  width: 280px;
  max-width: 280px;
  border-radius: 8px;
  box-sizing: border-box;
  height: 32px;
  padding: 0px 19px 0 16px;
`

export const titleInputStyle = css`
  & > span {
    border-color: ${globalColor(`--${illaPrefix}-techPurple-01`)}!important;
    box-shadow: 0 0 8px 0
      ${chroma(globalColor(`--${illaPrefix}-techPurple-01`))
    .alpha(0.2)
    .hex()};
  }
`

export const titleStyle = css`
  display: inline-block;
  max-width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const titleEditIconStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
  transition: all 0.2s ease-in-out;
  opacity: 0;
`

export const actionStyle = css`
  display: flex;
  align-items: center;
  padding: 8px 16px;
`

export const resourceBarStyle = css`
  margin-top: 8px;
  margin-bottom: 8px;
`

export const resourceBarTitleStyle = css`
  margin-right: 16px;
`

export const fillingStyle = css`
  flex: 1;
`

export const headerButtonStyle = css`
  box-sizing: border-box;
  font-size: 14px !important;

  & * {
    font-size: 14px !important;
  }
`

export const moreBtnStyle = css`
  margin-right: 8px;
`

export const runBtnStyle = css`
  color: ${globalColor(`--${illaPrefix}-techPurple-02`)}!important;
  background-color: ${globalColor(`--${illaPrefix}-techPurple-07`)}!important;

  &:hover {
    background-color: ${globalColor(`--${illaPrefix}-techPurple-06`)}!important;
  }
`

export const actionSelectStyle = css`
  height: 32px;
  font-size: 14px;

  & > div {
    padding: 0 16px;
  }
`

export const triggerSelectStyle = css`
  max-width: 313px;
  margin-right: 8px;
  border-radius: 8px !important;
`
export const resourceSelectContainerStyle = css``

export const resourceSelectStyle = css`
  min-width: 151px !important;
  max-width: 151px;
  border-radius: 8px 0 0 8px !important;
`

export const resourceOptionStyle = css`
  overflow: hidden;
  text-overflow: ellipsis;
`

export function applyEditIconStyle(disabled: boolean): SerializedStyles {
  const hoverStyle = disabled
    ? ""
    : css`
        &:hover > svg {
          color: ${globalColor(`--${illaPrefix}-grayBlue-06`)};
        }
      `

  const cursorStyle = disabled ? "cursor: not-allowed;" : "cursor: pointer;"

  return css`
    width: 32px;
    height: 32px;
    border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
    border-radius: 0 8px 8px 0;
    box-sizing: border-box;

    ${cursorStyle}
    ${hoverStyle}
    & > svg {
      margin: 8px;
      color: ${globalColor(`--${illaPrefix}-grayBlue-08`)};
    }
  `
}

export const sectionTitleStyle = css`
  font-size: 14px;
  line-height: 1.57;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const handlerTitleStyle = css`
  ${sectionTitleStyle};
  color: ${globalColor(`--${illaPrefix}-grayBlue-06`)};
  padding: 16px 16px 0;
`

export const panelPaddingStyle = css`
  padding: 8px 16px;
`

export const panelSubBarStyle = css`
  padding: 13px 16px;
`
export const newBtnStyle = css`
  padding-left: 16px;
`

export const dashBorderBottomStyle = css`
  border-bottom: 1px dashed ${globalColor(`--${illaPrefix}-grayBlue-07`)};
`

export const gridHandlersStyle = css`
  display: grid;
  gap: 8px;
  padding: 0 16px 8px;
`

export const handlerMoreIconStyle = css`
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

export const moreListStyle = css`
  list-style: none;
  margin: 0;
  padding: 8px 0;
  width: 184px;
`

export const moreListItemStyle = css`
  padding: 5px 16px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.57;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  &:hover {
    background: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  }
`

export const moreListItemWarnStyle = css`
  ${moreListItemStyle};
  color: ${globalColor(`--${illaPrefix}-red-03`)};
`

export const moreBtnMenuStyle = css`
  width: 180px;
`

export const duplicateActionStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)}!important;
`

export const deleteActionStyle = css`
  color: ${globalColor(`--${illaPrefix}-red-03`)}!important;
`

export const handlerItemWrapperStyle = css`
  display: flex;
  height: 32px;
  font-size: 14px;
  line-height: 1.57;
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
  cursor: pointer;
`

export const handlerItemContentStyle = css`
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

export const handlerItemMoreStyle = css`
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

export const radioBtnStyle = css`
  width: 184px;
`
