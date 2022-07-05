import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const transformerContainerStyle = css`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`

export const transfomerTipsStyle = css`
  display: grid;
  align-items: center;
  font-size: 14px;
  line-height: 1.57;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  margin: 0;
`
