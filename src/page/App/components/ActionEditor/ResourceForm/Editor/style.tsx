import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const formContainerStyle = css``

export const formTitleStyle = css`
  padding: 24px 0 16px 0;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const formFooterStyle = css`
  display: flex;
  padding: 24px;
  max-height: 80px;
`

export const formFooterFilling = css`
  flex: 1;
`

export const backIconStyle = css`
  display: inline-block;
  font-size: 12px;
  margin-right: 4px;
  margin-bottom: 2px;
`

export const createResourceBtnStyle = css`
  margin-left: 8px;
`
