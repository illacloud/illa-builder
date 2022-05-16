import { css, SerializedStyles } from "@emotion/react"
import { LabelPositionType } from "../Label/interface"

export function applyLabelWrapperStyle(
  labelPosition?: LabelPositionType,
  hasLabel?: boolean,
): SerializedStyles {
  let displayCss = css``
  if (hasLabel && labelPosition === "right")
    displayCss = css`
      display: flex;
      flex-direction: row-reverse;
    `
  if (hasLabel && labelPosition === "left")
    displayCss = css`
      display: flex;
    `

  return css`
    ${displayCss};
    width: 100%;
    height: 100%;
  `
}
