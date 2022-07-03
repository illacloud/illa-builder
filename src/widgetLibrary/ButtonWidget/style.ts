import { css, SerializedStyles } from "@emotion/react"
import { alignmentType } from "./interface"

export const applyButtonLayoutStyle = (
  alignment: alignmentType,
): SerializedStyles => {
  if (alignment === "fullWidth")
    return css`
      height: 100%;
      width: 100%;
    `
  return css`
    display: flex;
    height: 100%;
    justify-content: ${alignment};
  `
}
