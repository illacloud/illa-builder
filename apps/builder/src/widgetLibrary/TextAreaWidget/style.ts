import { css } from "@emotion/react"

export const getTextareaContentContainerStyle = (
  labelPosition: "left" | "right" | "top" = "left",
  height: number,
) => {
  return css`
    display: flex;
    flex: 1;
    flex-direction: ${labelPosition === "top" ? "column" : "row"};
    min-height: calc(100% - ${height}px);
    & textarea {
      resize: none;
    }
  `
}
