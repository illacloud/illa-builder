import { css } from "@emotion/react"
import { VALIDATE_MESSAGE_HEIGHT } from "@/page/App/components/ScaleSquare/constant/widget"

export const getTextareaContentContainerStyle = (
  labelPosition: "left" | "right" | "top" = "left",
  showValidationMessage: boolean,
) => {
  return css`
    display: flex;
    height: ${showValidationMessage
      ? `calc(100% - ${VALIDATE_MESSAGE_HEIGHT})px`
      : "100%"};
    flex-direction: ${labelPosition === "top" ? "column" : "row"};
    & textarea {
      resize: none;
    }
  `
}

export const textAreaStyle = css`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  & > textarea:hover {
    z-index: 0;
  }
`
