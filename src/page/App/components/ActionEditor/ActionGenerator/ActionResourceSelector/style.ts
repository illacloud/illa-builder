import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const containerStyle = css`
  display: flex;
  flex-direction: column;
`

export const titleStyle = css`
  padding: 24px 0 16px 0;
  font-size: 20px;
  font-weight: 5000;
  text-align: center;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const listStyle = css`
  margin-top: 16px;
  overflow: auto;
  max-height: 550px;
  height: 550px;
`

export const footerStyle = css`
  height: 80px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const resourceItemContainerStyle = css`
  padding: 12px 0 12px 24px;
  display: flex;
  align-items: center;
  height: 48px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  }
`

export const resourceItemSelectedStyle = css`
  background: ${globalColor(`--${illaPrefix}-techPurple-06`)};
`

export const resourceItemIconStyle = css`
  font-size: 24px;
`

export const resourceItemTitleStyle = css`
  margin-left: 8px;
  flex: 1;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const resourceItemTimeStyle = css`
  flex: 1;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`
