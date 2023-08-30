import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const cardListStyle = css`
  padding-top: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(384px, 1fr));
  grid-gap: 24px 24px;
  padding-bottom: 126px;
`
export const fallbackLoadingStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
  color: ${getColor("techPurple", "01")};
`
