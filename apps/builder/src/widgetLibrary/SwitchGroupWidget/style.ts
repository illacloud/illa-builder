import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

const baseLabelCss = css`
  display: block;
  font-size: 14px;
  text-overflow: ellipsis;
`

export const applyLabel = css`
  ${baseLabelCss};
  color: ${getColor("grayBlue", "02")};
`
export const applyCaptions = css`
  ${baseLabelCss};
  color: ${getColor("grey", "04")};
`

export const applySwitchContainer = (layoutPosition: "left" | "right") => {
  return css`
    display: inline-flex;
    word-wrap: break-word;
    flex-direction: ${layoutPosition === "left" ? "row" : "row-reverse"};
    gap: 8px;
    cursor: pointer;
    align-items: center;
  `
}

export const applyContainer = css`
  display: inline-flex;
  align-items: center;
  margin-right: 24px;
  gap: 6px 24px;
  flex-wrap: wrap;
`
