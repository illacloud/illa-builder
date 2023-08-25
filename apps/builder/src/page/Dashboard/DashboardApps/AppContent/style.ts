import { SerializedStyles, css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const cardContainerStyle: SerializedStyles = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 24px 24px;
  overflow: auto;
  padding-bottom: 126px;
`

export const fullWidthStyle: SerializedStyles = css`
  flex-grow: 1;
  overflow: hidden;
  margin-top: 16px;
  padding: 0 15%;
  display: flex;
  flex-direction: column;
`

export const menuContainerStyle = css`
  display: flex;
  margin-bottom: 40px;
  flex-direction: row;
  align-items: center;
`

export const emptyStyle: SerializedStyles = css`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`

export const emptyTextStyle: SerializedStyles = css`
  color: ${getColor("grayBlue", "02")};
  font-weight: 600;
  line-height: 22px;
`
