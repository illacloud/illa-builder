import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const resultContainerStyle = css`
  position: absolute;
  bottom: 0;
  width: 100%;
`

export const resultWrapperStyle = css`
  display: flex;
  align-items: center;
  padding: 16px;
`

export const errorResultWrapperStyle = css`
  ${resultWrapperStyle};
  background: ${globalColor(`--${illaPrefix}-red-07`)};
`

export const successResultWrapperStyle = css`
  ${resultWrapperStyle};
  background: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
`

export const errorIconStyle = css`
  width: 24px;
  height: 24px;
  min-width: 24px;

  & path {
    fill: ${globalColor(`--${illaPrefix}-orange-07`)};

    &:last-child {
      fill: ${globalColor(`--${illaPrefix}-orange-03`)};
    }
  }
`

export const successIconStyle = css`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  & path {
    fill: ${globalColor(`--${illaPrefix}-green-07`)};

    &:last-child {
      fill: ${globalColor(`--${illaPrefix}-green-03`)};
    }
  }
`

export const resCloseIconStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
  cursor: pointer;
  padding: 8px;
  font-size: 14px;
  width: 14px;
  height: 14px;
  box-sizing: content-box;
  &:hover {
    color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  }
`
