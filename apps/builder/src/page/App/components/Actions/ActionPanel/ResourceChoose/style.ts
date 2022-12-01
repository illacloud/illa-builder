import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const resourceChooseContainerStyle = css`
  display: flex;
  align-items: center;
  padding: 0 16px;
  width: 100%;
  overflow-x: auto;
  flex-direction: row;
  min-height: 64px;
  border-bottom: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
`

export const resourceTitleStyle = css`
  flex-grow: 1;
  font-size: 14px;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const resourceEndStyle = css`
  flex-grow: 0;
  flex-basis: 0;
  margin-left: 16px;
  display: flex;
  flex-shrink: 1;
  flex-direction: row;
`

export const createNewStyle = css`
  color: ${globalColor(`--${illaPrefix}-techPurple-01`)};
`

export const itemContainer = css`
  width: 100%;
  display: flex;
  align-items: center;
`

export const itemLogo = css`
  flex-shrink: 0;
`

export const itemText = css`
  margin-left: 8px;
  flex-shrink: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  flex-grow: 1;
`
