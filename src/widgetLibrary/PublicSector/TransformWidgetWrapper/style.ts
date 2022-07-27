import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/serialize"
import { getFlexDirection } from "@/widgetLibrary/PublicSector/BasicWrapper/style"

export const applyLabelAndComponentWrapperStyle = (
  labelPosition: "left" | "right" | "top" = "left",
): SerializedStyles => {
  return css`
    width: 100%;
    display: flex;
    ${getFlexDirection(labelPosition)}
  `
}
export const applyValidateMessageWrapperStyle = (
  labelWidth: number,
  labelPosition: "left" | "right" | "top" = "left",
): SerializedStyles => {
  return css`
    width: 100%;
    padding-left: ${labelPosition === "top"
      ? 0
      : `calc(min(${labelWidth}%, 80%) + 8px)`};
  `
}
