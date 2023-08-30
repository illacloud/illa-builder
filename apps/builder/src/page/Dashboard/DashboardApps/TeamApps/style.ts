import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const fallbackLoadingStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
  color: ${getColor("techPurple", "01")};
`
export const cardContainerStyle = css`
  padding-top: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 24px 24px;
  overflow: auto;
  padding-bottom: 126px;
`
