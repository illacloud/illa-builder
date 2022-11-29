import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const actionTitleBarStyle = css`
  display: flex;
  min-width: 700px;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  min-height: 48px;
`

export const actionTitleBarDisplayNameStyle = css`
  width: 280px;
`

export const actionTitleBarSpaceStyle = css`
  flex-grow: 1;
  min-width: 8px;
`

export const actionTitleBarRunStyle = css`
  margin-left: 8px;
`

export const editableTitleBarWrapperStyle = css`
  width: 280px;
`
