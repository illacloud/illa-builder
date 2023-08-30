import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const cardListStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(384px, 1fr));
  grid-gap: 24px 24px;
`

export const cardListContainerStyle = css`
  display: flex;
  flex-direction: column;
  overflow: auto;
  flex-grow: 1;
  padding: 24px 15% 126px;
`

export const loadingStyle = css`
  margin-top: 24px;
  align-self: center;
`

export const fallbackLoadingStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
  color: ${getColor("techPurple", "01")};
`
