import { css } from "@emotion/react"

export const resourceContainerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const cardContainerStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  grid-gap: 24px 24px;
  overflow: auto;
  padding: 0 32px;
  padding-bottom: 32px;
`
