import chroma from "chroma-js"
import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const Container = css`
  flex: 1;
`

export const Header = css`
  display: flex;
  align-items: center;
  padding: 8px 16px 8px 0;
  height: 48px;
  border-bottom: 1px solid ${globalColor(`--${illaPrefix}-grayblue-08`)};
  box-sizing: border-box;
  `

export const TitleContainer = css`
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
    background-color: ${globalColor(`--${illaPrefix}-grayblue-09`)};

    & > svg {
      opacity: 1;
    }
  }
`

export const TitleInputContainer = css`
  width: 280px;
  max-width: 280px;
  border-radius: 8px;
  box-sizing: border-box;
  height: 32px;
  padding: 0px 19px 0 16px;
`

export const TitleInputCss = css`
  & > span {
    border-color: ${globalColor(`--${illaPrefix}-brand-purple-01`)}!important;
    box-shadow: 0 0 8px 0
      ${chroma(globalColor(`--${illaPrefix}-brand-purple-01`))
    .alpha(0.2)
    .hex()};
  }
`

export const Title = css`
  display: inline-block;
  max-width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const TitleEditIcon = css`
  color: ${globalColor(`--${illaPrefix}-grayblue-05`)};
  /* font-size: 14px; */
  transition: all 0.2s ease-in-out;
  opacity: 0;
`

export const Action = css`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  height: 48px;
`

export const Filling = css`
  flex: 1;
`

export const HeaderButton = css`
  height: 32px;
  box-sizing: border-box;
  border-radius: 8px !important;
  font-size: 14px !important;

  & * {
    line-height: 14px !important;
    font-size: 14px !important;
  }
`

export const MoreBtn = css`
  width: 32px;
  margin-right: 8px;
  padding: 9px !important;
  color: ${globalColor(`--${illaPrefix}-grayblue-01`)}!important;
  background-color: ${globalColor(`--${illaPrefix}-grayblue-09`)}!important;

  &:hover {
    background-color: ${globalColor(`--${illaPrefix}-grayblue-08`)}!important;
  }
`

export const RunBtn = css`
  color: ${globalColor(`--${illaPrefix}-brand-purple-02`)}!important;
  background-color: ${globalColor(`--${illaPrefix}-brand-purple-07`)}!important;

  &:hover {
    background-color: ${globalColor(
  `--${illaPrefix}-brand-purple-06`,
)}!important;
  }
`

export const ActionSelect = css`
  height: 32px;
  font-size: 14px;

  & > div {
    padding: 0 16px;
  }
`

export const ModeSelect = css`
  max-width: 115px;
  border-radius: 8px 0 0 8px !important;
`
export const TriggerSelect = css`
  max-width: 313px;
  margin-right: 8px;
  border-radius: 0 8px 8px 0px !important;
`
export const ResourceSelectContainer = css``

export const ResourceSelect = css`
  min-width: 151px !important;
  max-width: 151px;
  border-radius: 8px 0 0 8px !important;
`

export const EditIcon = css`
  width: 32px;
  height: 32px;
  border: 1px solid ${globalColor(`--${illaPrefix}-grayblue-08`)};
  border-radius: 0 8px 8px 0;
  box-sizing: border-box;

  & > svg {
    margin: 8px;
    color: ${globalColor(`--${illaPrefix}-grayblue-08`)};
  }
`
