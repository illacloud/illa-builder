import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

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

export const hotSpotContainerStyle = css`
  width: 24px;
  height: 24px;
  color: ${getColor("grayBlue", "04")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  :hover {
    color: ${getColor("grayBlue", "02")};
  }
`
