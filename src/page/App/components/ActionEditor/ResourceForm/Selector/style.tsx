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
  font-weight: 5000;
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

export const resourceItemStyle = css`
  border-radius: 8px;
  border: solid 1px ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  background-color: ${globalColor(`--${illaPrefix}-white-01`)};
  padding: 24px 44px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 4px 10px 0 ${globalColor(`--${illaPrefix}-blackAlpha-07`)};
    background-color: ${globalColor(`--${illaPrefix}-techPurple-07`)};
    border-color: ${globalColor(`--${illaPrefix}-techPurple-01`)};
  }
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
