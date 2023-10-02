import { css } from "@emotion/react"

export const deleteActionContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  overflow: hidden;
  :hover {
    .deleteContainer {
      transform: translateX(0);
    }
  }
`

export const deleteContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  transform: translateX(32px);
  transition: all 0.2s ease-in-out;
`
