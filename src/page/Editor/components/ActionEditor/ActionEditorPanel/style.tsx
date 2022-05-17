import chroma from "chroma-js"
import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const ContainerCSS = css`
  flex: 1;
`

export const HeaderCSS = css`
  display: flex;
  align-items: center;
  padding: 8px 16px 8px 0;
  height: 48px;
  border-bottom: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  box-sizing: border-box;
`

export const TitleContainerCSS = css`
  display: flex;
  align-items: center;
  width: 280px;
  max-width: 280px;
  border-radius: 8px;
  box-sizing: border-box;
  height: 32px;
  line-height: 32px;
  transition: all 0.2s ease-in-out;
  padding: 0px 19px 0 16px;

  &:hover {
    cursor: pointer;
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};

    & > svg {
      opacity: 1;
    }
  }
`

export const TitleInputContainerCSS = css`
  width: 280px;
  max-width: 280px;
  border-radius: 8px;
  box-sizing: border-box;
  height: 32px;
  padding: 0px 19px 0 16px;
`

export const TitleInputCSS = css`
  & > span {
    border-color: ${globalColor(`--${illaPrefix}-techPurple-01`)}!important;
    box-shadow: 0 0 8px 0
      ${chroma(globalColor(`--${illaPrefix}-techPurple-01`))
        .alpha(0.2)
        .hex()};
  }
`

export const TitleCSS = css`
  display: inline-block;
  max-width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const TitleEditIconCSS = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
  /* font-size: 14px; */
  transition: all 0.2s ease-in-out;
  opacity: 0;
`

export const ActionCSS = css`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  height: 48px;
`

export const FillingCSS = css`
  flex: 1;
`

export const HeaderButtonCSS = css`
  box-sizing: border-box;
  border-radius: 8px !important;
  font-size: 14px !important;

  & * {
    font-size: 14px !important;
  }
`

export const MoreBtnCSS = css`
  width: 32px;
  margin-right: 8px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-01`)}!important;
  background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)}!important;

  &:hover {
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-08`)}!important;
  }
`

export const RunBtnCSS = css`
  color: ${globalColor(`--${illaPrefix}-techPurple-02`)}!important;
  background-color: ${globalColor(`--${illaPrefix}-techPurple-07`)}!important;

  &:hover {
    background-color: ${globalColor(`--${illaPrefix}-techPurple-06`)}!important;
  }
`

export const ActionSelectCSS = css`
  height: 32px;
  font-size: 14px;

  & > div {
    padding: 0 16px;
  }
`

export const ModeSelectCSS = css`
  max-width: 115px;
  border-radius: 8px 0 0 8px !important;
`
export const TriggerSelectCSS = css`
  max-width: 313px;
  margin-right: 8px;
  border-radius: 0 8px 8px 0px !important;
`
export const ResourceSelectContainerCSS = css``

export const ResourceSelectCSS = css`
  min-width: 151px !important;
  max-width: 151px;
  border-radius: 8px 0 0 8px !important;
`

export const EditIconCSS = css`
  width: 32px;
  height: 32px;
  border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  border-radius: 0 8px 8px 0;
  box-sizing: border-box;
  cursor: pointer;

  & > svg {
    margin: 8px;
    color: ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  }

  &:hover > svg {
    color: ${globalColor(`--${illaPrefix}-grayBlue-06`)};
  }
`

export const DisableTextCSS = css`
  font-size: 14px;
  line-height: 1.57;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`
