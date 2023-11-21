import { css } from "@emotion/react"

export const containerStyle = (isGridList: boolean = false) => {
  const basicStyle = css`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `
  const singleRowStyle = css`
    flex-direction: column;
    gap: 8px;
  `
  return css`
    display: flex;
    padding: 8px 0;
    ${isGridList ? singleRowStyle : basicStyle};
    width: 100%;
  `
}

export const gapContainerStyle = css`
  display: flex;
  width: 100%;
  gap: 8px;
`
