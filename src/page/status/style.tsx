import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const errorPageStyle = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: ${globalColor(`--${illaPrefix}-gray-02`)};
  line-height: 22px;
  span + span {
    color: ${globalColor(`--${illaPrefix}-gray-03`)};
  }
`

export const iconStyle = css`
  height: 96px;
  width: 96px;
  border-radius: 50px;
  background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  margin-bottom: 24px;
`

export const buttonStyle = css`
  margin-top: 24px;
  display: flex;
  gap: 8px;
`
