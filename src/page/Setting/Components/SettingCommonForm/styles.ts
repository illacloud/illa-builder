import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const settingBodyStyle = css`
  display: flex;
  min-width: 280px;
  flex-direction: column;
  padding-top: 40px;
`

export const settingItemStyle = css`
  margin-bottom: 24px;
  margin: 0 auto;
`

export const itemTitleStyle = css`
  display: inline-block;
  height: 22px;
  font-size: 14px;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  margin-right: 3px;
  margin-bottom: 8px;
`
export const itemSubtitleStyle = css`
  font-size: 14px;
  font-weight: normal;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`
export const saveButtonStyle = css`
  width: 280px;
  margin-top: 40px;
`

export const errorLineStyle = css`
  margin-top: 8px;
  color: ${globalColor(`--${illaPrefix}-orange-03`)};
  display: flex;
  align-items: center;
`
export const errorTextStyle = css`
  display: inline-block;
  margin-left: 8px;
  font-size: 14px;
`
