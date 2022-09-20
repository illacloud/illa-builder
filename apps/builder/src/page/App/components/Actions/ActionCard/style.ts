import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export function applyItemStyle(): SerializedStyles {
  const hoverStyle = css`
    &:hover {
      box-shadow: 0 4px 10px 0 ${globalColor(`--${illaPrefix}-blackAlpha-07`)};
      background-color: ${globalColor(`--${illaPrefix}-techPurple-07`)};
      border-color: ${globalColor(`--${illaPrefix}-techPurple-01`)};
    }
  `

  return css`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24px 0;
    border-radius: 8px;
    border: solid 1px ${globalColor(`--${illaPrefix}-grayBlue-08`)};
    position: relative;
    display: flex;
    background-color: ${globalColor(`--${illaPrefix}-white-01`)};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    ${hoverStyle};
  `
}

export const nameStyle = css`
  margin-top: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`
