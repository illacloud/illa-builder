import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const formContainerStyle = css``

export const formTitleStyle = css`
  padding: 16px 40px 8px 16px;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`
export const formBodyStyle = css`
  padding: 8px 24px;
`
export const formFooterStyle = css`
  display: flex;
  padding: 24px;
  max-height: 80px;
`

export const formFooterFillingStyle = css`
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
