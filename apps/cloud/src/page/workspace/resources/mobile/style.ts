import { css } from "@emotion/react"

export const resourceContainerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const cardContainerStyle = css`
  display: grid;
  grid-template-columns: 1;
  grid-gap: 24px 24px;
  overflow: auto;
  padding: 0 16px;
  padding-bottom: 24px;
`
