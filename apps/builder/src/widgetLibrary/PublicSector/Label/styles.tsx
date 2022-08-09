import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { LabelAlignType, LabelPositionType } from "./interface"

const baseLabelCss = css`
  display: block;
  font-size: 12px;
  font-weight: 500;
  text-overflow: ellipsis;
`

function applyLeftLabelStyle(
  position: "left" | "right",
  alignment: LabelAlignType,
  w?: string,
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
    overflow: hidden;
    align-self: center;
    width: ${w};
    text-align: ${alignment};
    flex: 0 1 ${w};
    ${marginCss}
  `
}

function applyTopLabelStyle(alignment: "left" | "right"): SerializedStyles {
  return css`
    ${baseLabelCss};
    margin-bottom: 8px;
    width: 100%;
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

export const applyLabelTitleStyle = (hasTooltip: boolean) => {
  const borderCss = hasTooltip
    ? css`
        border-bottom: 1px dashed ${globalColor(`--${illaPrefix}-grayBlue-07`)};
      `
    : css``
  return css`
    color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
    font-size: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
    ${borderCss}
  `
}

export const labelNameStyle = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  :after {
    background-image: repeating-linear-gradient(
      90deg,
      ${globalColor(`--${illaPrefix}-grayBlue-06`)} 0,
      ${globalColor(`--${illaPrefix}-grayBlue-06`)} 1px,
      transparent 0,
      transparent 3px,
      ${globalColor(`--${illaPrefix}-grayBlue-06`)} 0,
      ${globalColor(`--${illaPrefix}-grayBlue-06`)} 4px
    );
    background-position: 50%;
    background-size: 4px 1px;
    content: "";
    height: 1px;
    left: 0;
    position: absolute;
    top: 100%;
    width: calc(100% - 6px);
  }
`

export const labelCaptionCss = css`
  overflow: hidden;
  color: ${globalColor(`--${illaPrefix}-gray-04`)};
  text-overflow: ellipsis;
`

export const labelRequiredCss = css`
  color: ${globalColor(`--${illaPrefix}-red-01`)};
  margin-left: 2px;
`
