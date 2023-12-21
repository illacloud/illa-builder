import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const labelContainerStyle = (labelAlign?: string) => {
  return css`
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    text-align: ${labelAlign ?? "left"};
    overflow-wrap: break-word;
  `
}

export const applyLabelAndComponentWrapperStyle = (
  labelPosition?: "left" | "right",
  labelHidden?: boolean,
) => {
  return css`
    max-width: 100%;
    display: flex;
    flex-direction: ${labelPosition === "right" ? "row-reverse" : "row"};
    gap: ${!labelHidden ? "8px" : "0"};
    align-items: center;
  `
}

export const labelStyle = (allowWrap?: boolean) => css`
  color: ${getColor("gray", "02")};
  white-space: ${allowWrap ? "normal" : "nowrap"};
  text-overflow: ellipsis;
  overflow: hidden;
`

export const labelCaptionStyle = (allowWrap?: boolean) => css`
  color: ${getColor("gray", "04")};
  white-space: ${allowWrap ? "normal" : "nowrap"};
  text-overflow: ellipsis;
  overflow: hidden;
`
