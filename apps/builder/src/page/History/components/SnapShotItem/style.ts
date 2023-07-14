import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const leftWrapperStyle = css`
  position: relative;
  width: 16px;
  display: flex;
  justify-content: center;
`
export const badgeDotStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  position: relative;
`

export const ellipse49Style = css`
  width: 6px;
  height: 6px;
  background-color: ${getColor("techPurple", "01")};
  border-radius: 50%;
`

export const lineStyle = css`
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  top: 24px;
  width: 1px;
  height: calc(100% - 24px);
  background: ${getColor("grayBlue", "08")};
`

export const textStyle = css`
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 16px;
  padding-bottom: 24px;
  display: flex;
`

export const timelineStyle = css`
  justify-content: start;
  align-items: stretch;
  gap: 8px;
  display: flex;
`

export const timeStyle = css`
  color: ${getColor("techPurple", "01")};
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
`

export const contentStyle = css`
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 16px;
  flex: 1;
  display: flex;
`

export const modifyContentStyle = css`
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 8px;
  flex: 1;
  display: flex;
`

export const editorInfoStyle = css`
  justify-content: start;
  align-items: center;
  gap: 8px;
  display: flex;
`

export const avatarStyle = css`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`
export const nameStyle = css`
  //color: var(--illa-grayblue-02, #1D2129);
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
`
export const descStyle = css`
  color: ${getColor("grayBlue", "03")};
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
`
