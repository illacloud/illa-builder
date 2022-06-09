import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const containerStyle = css`
  overflow: auto;
  padding: 24px;
`
export const titleStyle = css`
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 5000;
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

export function applyResourceItemStyle(isDraft?: boolean): SerializedStyles {
  const draftStyle = css`
    cursor: not-allowed;
    &:after {
      top: 0;
      position: absolute;
      content: attr(data-draft-tip);
      padding: 0 8px;
      line-height: 16px;
      font-size: 12px;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      background: ${globalColor(`--${illaPrefix}-techPurple-07`)};
      color: ${globalColor(`--${illaPrefix}-techPurple-02`)};
    }
  `
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

    ${!isDraft && hoverStyle}
    ${isDraft && draftStyle}
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
