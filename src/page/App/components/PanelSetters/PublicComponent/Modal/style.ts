import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const headerStyle = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-06`)};
  font-size: 16px;
  padding: 0 16px;
  font-weight: 500;
  span {
    display: flex;
    align-items: center;
  }
`

export const closeIconStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14px;
  height: 14px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  cursor: pointer;
`

export const modalWrapperStyle = css`
  width: 400px;
`
export const listWrapperStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 12px 0;
`
