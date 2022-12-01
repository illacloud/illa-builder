import { css } from "@emotion/react"
import chroma from "chroma-js"
import { globalColor, illaPrefix } from "@illa-design/react"

export const searchHeaderStyle = css`
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: row;
  padding: 0 16px;
  align-items: center;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`

export const searchInputContainerStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

export const searchHeaderTitleStyle = css`
  justify-content: flex-start;
`

export const searchHeaderTitleTextStyle = css`
  white-space: nowrap;
  font-size: 14px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
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
    border-color: ${globalColor(`--${illaPrefix}-techPurple-01`)} !important;
    box-shadow: 0 0 8px 0
      ${chroma(globalColor(`--${illaPrefix}-techPurple-01`))
        .alpha(0.2)
        .hex()};
  }
`

export const searchInputIconStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
`
