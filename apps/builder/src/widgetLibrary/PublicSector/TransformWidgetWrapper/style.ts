import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/serialize"
import { getFlexDirection } from "@/widgetLibrary/PublicSector/BasicWrapper/style"

export const applyLabelAndComponentWrapperStyle = (
  labelPosition: "left" | "right" | "top" = "left",
  fullHeight: boolean = false,
  alignment: "start" | "center" | "end" = "start",
): SerializedStyles => {
  return css`
    width: 100%;
    height: ${fullHeight ? "100%" : "auto"};
    display: flex;
    flex-direction: row;
    justify-content: ${alignment};
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

export const widgetWrapperStyle = css`
  width: 0;
  flex-grow: 1;
  flex-shrink: 1;
`
