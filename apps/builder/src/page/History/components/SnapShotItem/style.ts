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

export const applyDotStyle = (selected?: boolean) => {
  return css`
    width: 6px;
    height: 6px;
    background-color: ${selected
      ? getColor("techPurple", "03")
      : getColor("grayBlue", "02")};
    border-radius: 50%;
  `
}

const textEllipsisStyle = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  flex-grow: 1;
  width: 263px;
`

export const timelineStyle = css`
  justify-content: start;
  align-items: stretch;
  gap: 8px;
  display: flex;
`

export const itemHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export const applyTimeStyle = (selected?: boolean) => {
  return css`
    color: ${selected
      ? getColor("techPurple", "03")
      : getColor("grayBlue", "02")};
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    cursor: pointer;
  `
}

export const manualStyle = css`
  display: flex;
  gap: 4px;
  align-items: center;
  color: ${getColor("grayBlue", "04")};
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
`
export const contentStyle = css`
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 16px;
  display: flex;
`

export const modifyContentStyle = css`
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 8px;
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
  flex-shrink: 0;
`

export const nameStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  max-width: 230px;
  ${textEllipsisStyle};
`

export const descStyle = css`
  color: ${getColor("grayBlue", "03")};
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
`
