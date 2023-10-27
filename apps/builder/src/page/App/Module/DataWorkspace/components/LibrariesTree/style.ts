import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const itemContainerStyle = css`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`

export const titleContainerStyle = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

export const titleStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 12px;
  font-weight: 500;
  line-height: 24px;
`

export const actionGroupContainerStyle = css`
  display: flex;
  align-items: center;
`

export const aliasContainerStyle = css`
  color: ${getColor("grayBlue", "04")};
  font-size: 12px;
  font-weight: 450;
  line-height: 16px;
  padding: 0;
  margin: 0;
`

export const libraryContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-family: "Fira Code", monospace;
`
