import { css } from "@emotion/react"

export const cellContainer = css`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 8px;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`

export const currencyContainerStyle = css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`
