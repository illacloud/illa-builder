import { css } from "@emotion/react"

export const textareaContainerStyle = css`
  width: 100%;
  height: 100%;
`

export const getTextareaContentContainerStyle = (
  labelPosition: "left" | "right" | "top" = "left",
  height: number,
) => {
  return css`
    display: flex;
    flex: 1;
    flex-direction: ${labelPosition === "top" ? "column" : "row"};
    height: calc(100% - ${height}px);
    & textarea {
      resize: none;
    }
  `
}

export const wrapperContainerStyle = css`
  width: 100%;
  height: 100%;
`
