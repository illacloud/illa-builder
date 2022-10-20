import { css } from "@emotion/react"

export const basicContainerWrapperStyle = (canResizeY: boolean) => {
  return css`
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: ${canResizeY ? "auto" : "hidden"};
  `
}
