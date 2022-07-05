import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const actionResultErrorIndicatorWrapper = css`
  display: flex;
  align-items: center;
  padding: 16px;
  background: ${globalColor(`--${illaPrefix}-red-07`)};
`

export const actionResultErrorIndicatorMessage = css`
  margin-left: 8px;
  max-height: 40px;
  overflow-y: auto;
  font-size: 14px;
`

export const actionResultErrorIndicatorIcon = css`
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
