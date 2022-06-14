import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/serialize"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const categoryStyle = css`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.57;
  font-family: HelveticaNeue;
  color: ${globalColor(`--${illaPrefix}-grayBlue-06`)};
  padding-top: 8px;
`

export const categoryTitleStyle = css`
  padding: 24px 0 16px 0;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export function applyResourceListStyle(last?: boolean): SerializedStyles {
  return css`
    display: grid;
    grid-gap: 8px 24px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    padding-bottom: ${last ? `0` : `8px`};
    padding-top: 8px;
  `
}

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
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: solid 1px ${globalColor(`--${illaPrefix}-grayBlue-08`)};
    background-color: ${globalColor(`--${illaPrefix}-white-01`)};
    padding: 24px;
    text-align: center;
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
  font-family: HelveticaNeue;
  font-weight: 500;
  line-height: 1.57;
  color: ${globalColor(`--${illaPrefix}-gray-01`)}; ;
`

export const selectLayoutStyle = css`
  overflow: auto;
  padding: 0 24px 24px;
  max-height: 812px;
`
