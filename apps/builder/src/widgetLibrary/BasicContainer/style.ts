import { css } from "@emotion/react"

export const basicContainerWrapperStyle = (
  canResizeY: boolean,
  padding: number = 0,
) => {
  return css`
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: ${canResizeY ? "auto" : "hidden"};
    padding: ${padding}px;
  `
}
