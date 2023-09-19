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
      ${publicPaddingStyle}
    `
  }

  const basicStyle = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `
  return css`
    padding: 0px 16px;
    ${basicStyle};
  `
}

export const applySetterPublicWrapperStyle = (
  isSetterSingleRowWrapper: boolean = false,
  notNeedPadding: boolean,
) => {
  const widthStyle = isSetterSingleRowWrapper
    ? css`
        width: 100%;
      `
    : null
  if (notNeedPadding) {
    return css`
      width: 100%;
    `
  }
  return css`
    padding: 8px 0;
    min-height: 48px;
    ${widthStyle}
  `
}
