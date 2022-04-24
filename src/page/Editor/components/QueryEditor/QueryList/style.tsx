import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const QueryListContainer = css`
  display: flex;
  flex-direction: column;
  width: 255px;
  border-right: 1px solid ${globalColor(`--${illaPrefix}-grayblue-08`)};
  `

export const QueryListHeader = css`
  height: 48px;
  display: flex;
  align-items: center;
  padding: 13px 16px;
  color: ${globalColor(`--${illaPrefix}-grayblue-06`)};
  justify-content: space-between;
  `

export const NewButton = css`
  background-color: ${globalColor(`--${illaPrefix}-purple-07`)};
  color: ${globalColor(`--${illaPrefix}-purple-02`)};
  justify-content: center;
  font-size: 14px;
  margin: 0 16px;
  height: 32px;
  `

export const AddIconInNewButton = css`
  margin-right: 8px;
`
