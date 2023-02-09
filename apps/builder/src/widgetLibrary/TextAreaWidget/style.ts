import { css } from "@emotion/react"

export const textareaContainerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const getTextareaContentContainerStyle = (
  labelPosition: "left" | "right" | "top" = "left",
) => {
  return css`
    display: flex;
    flex: 1;
    flex-direction: ${labelPosition === "top" ? "column" : "row"};
    & textarea {
      resize: none;
    }
  `
}
