import { css, SerializedStyles } from "@emotion/react"
import { alignmentType } from "./interface"

export const applyButtonLayoutStyle = (
  alignment: alignmentType,
): SerializedStyles => {
  if (alignment === "fullWidth")
    return css`
      width: 100%;
    `
  return css`
    display: flex;
    justify-content: ${alignment};
  `
}
