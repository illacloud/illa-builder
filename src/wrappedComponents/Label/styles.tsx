import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { LabelAlignType, LabelPositionType } from "./interface"

const baseLabelCss = css`
  display: block;
  overflow-wrap: break-word;
  font-size: 12px;
  font-weight: 500;
`

function applyLeftLabelStyle(
  position: "left" | "right",
  alignment: LabelAlignType,
  width?: string,
): SerializedStyles {
  const isOnLeft = position === "left"
  const marginCss = isOnLeft
    ? css`
        margin-right: 8px;
      `
    : css`
        margin-left: 8px;
      `
  return css`
    ${baseLabelCss};
    width: ${width};
    max-width: 80%;
    flex: 0 1 ${width};
    align-self: center;
    text-align: ${alignment};
    ${marginCss}
  `
}

function applyTopLabelStyle(alignment: "left" | "right"): SerializedStyles {
  return css`
    ${baseLabelCss};

    margin-bottom: 8px;
    text-align: ${alignment};
  `
}

export function applyLabelStyle(
  position: LabelPositionType,
  alignment: LabelAlignType,
  width?: string,
): SerializedStyles {
  if (position === "top") {
    return applyTopLabelStyle(alignment)
  } else {
    return applyLeftLabelStyle(position, alignment, width)
  }
}

export const labelTitleCss = css`
  color: ${globalColor(`--${illaPrefix}-gray-03`)};
`

export const labelCaptionCss = css`
  color: ${globalColor(`--${illaPrefix}-gray-04`)};
`

export const labelRequiredCss = css`
  color: ${globalColor(`--${illaPrefix}-red-01`)};
  margin-left: 2px;
`
