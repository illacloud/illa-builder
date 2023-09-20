import { SerializedStyles, css } from "@emotion/react"

export const publicPaddingStyle = css`
  padding: 0 16px;
  box-sizing: border-box;
`

export function applySetterWrapperStyle(
  isSetterSingleRow: boolean = false,
  useCustomLayout: boolean = false,
): SerializedStyles {
  if (useCustomLayout) {
    return css``
  }
  if (isSetterSingleRow) {
    return css`
      padding: 0 16px;
    `
  }

  return css`
    padding: 0px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `
}
