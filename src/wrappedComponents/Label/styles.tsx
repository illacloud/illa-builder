import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

const baseLabelCss = css`
  display: block;
  overflow-wrap: break-word;
  font-size: 12px;
  font-weight: 500;
`

function applyLeftLabelStyle(
  alignment: "left" | "right",
  width?: string,
): SerializedStyles {
  return css`
    ${baseLabelCss};
    width: ${width};
    max-width: 80%;
    flex: 0 1 ${width};
    align-self: center;
    text-align: ${alignment};
    margin-right: 8px;
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
  labelPosition: "left" | "top",
  alignment: "left" | "right",
  width?: string,
): SerializedStyles {
  if (labelPosition === "top") {
    return applyTopLabelStyle(alignment)
  } else {
    return applyLeftLabelStyle(alignment, width)
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
