import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const mainTitleStyle = css`
  display: flex;
  font-size: 12px;
  line-height: 20px;
  font-family: 'Helvetica Neue';
`

export const contentAreaStyle = css`
  flex: 1;
  margin-right: 10px;
`

export const titleTextStyle = css`
  color: ${globalColor(`--${illaPrefix}-techPurple-01`)};
  font-weight: 500;
`

export const docTextStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`

export const evaluationStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  font-weight: 500;
`

export const mainTextHeightStyle = css`
  height: 22px;
  line-height: 1.83;
`

export const infoTextHeightStyle = css`
  line-height: 1.67;
`
