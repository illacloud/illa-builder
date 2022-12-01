import { SerializedStyles, css } from "@emotion/react"
import { getColor, globalColor, illaPrefix } from "@illa-design/react"

export function applyItemStyle(isDraft: boolean): SerializedStyles {
  const draftStyle = isDraft
    ? css`
        pointer-events: auto;
        cursor: not-allowed;
      `
    : css``

  const hoverStyle = isDraft
    ? css``
    : css`
        &:hover {
          box-shadow: 0 4px 10px 0
            ${globalColor(`--${illaPrefix}-blackAlpha-07`)};
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
    ${draftStyle};
  `
}

export const nameStyle = css`
  margin-top: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const comingStyle = css`
  position: absolute;
  border-radius: 0 0 4px 4px;
  padding: 0 8px;
  top: 0;
  height: 16px;
  background-color: ${getColor("techPurple", "07")};
  font-size: 10px;
  color: ${getColor("techPurple", "02")};
`
