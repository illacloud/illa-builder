import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const containerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 16px 24px 24px 24px;
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
