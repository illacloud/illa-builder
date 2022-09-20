import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const containerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 16px 24px 24px 24px;
`
export const titleStyle = css`
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const categoryStyle = css`
  display: inline-block;
  height: 30px;
  line-height: 30px;
  padding-top: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`

export const resourceListStyle = css`
  padding: 8px 0;
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`

export function applyResourceItemStyle(): SerializedStyles {
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

export const resourceIconStyle = css`
  font-size: 32px;
`

export const resourceNameStyle = css`
  margin-top: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`
