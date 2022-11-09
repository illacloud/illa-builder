import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const pageNameStyle = css`
  max-width: 186px;
  font-size: 12px;
  font-weight: 500;
`

export const homePageIconStyle = css`
  font-size: 12px;
  width: 12px;
  height: 12px;
  flex: none;
`

export const pageItemWrapperStyle = (isSelected: boolean) => {
  return css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    width: 100%;
    height: 24px;
    cursor: pointer;
    background-color: ${isSelected
      ? globalColor(`--${illaPrefix}-techPurple-07`)
      : globalColor(`--${illaPrefix}-white-01`)};
  `
}
