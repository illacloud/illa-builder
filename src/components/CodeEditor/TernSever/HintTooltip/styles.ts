import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const mainTitleStyle = css`
  display: flex;
  font-size: 12px;
  line-height: 20px;
  font-family: "Helvetica Neue";
`

export const contentAreaStyle = css`
  flex: 1;
`

export const titleTextStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

export const evaluationContentStyle = css`
  font-family: "Helvetica Neue";
`

export const evaluationTriggerStyle = css`
  white-space: pre;
`

export const docIconStyle = css`
  text-decoration: none;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  }

  &:active,
  &:visited,
  &:link,
  &:hover {
    color: ${globalColor(`--${illaPrefix}-techPurple-01`)};
  }
`

export const infoTextHeightStyle = css`
  line-height: 1.67;
`
