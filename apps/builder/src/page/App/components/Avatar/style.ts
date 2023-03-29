import { SerializedStyles, css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export function applyUserAvatarStyle(
  background: string,
  showType?: string,
  type?: string,
): SerializedStyles {
  const basicStyle = css`
    display: inline-block;
    background: ${background};
    text-align: center;
    border-radius: 50%;
    cursor: pointer;
    flex-shrink: 0;
    color: ${globalColor(`--${illaPrefix}-white-01`)};
  `
  if (showType === "components") {
    if (type === "list") {
      return css`
        ${basicStyle};
        width: 24px;
        height: 24px;
        line-height: 24px;
      `
    }
    return css`
      ${basicStyle};
      width: 14px;
      height: 14px;
      line-height: 14px;
      font-weight: 500;
    `
  }

  return css`
    ${basicStyle};
    width: 32px;
    height: 32px;
    line-height: 32px;
  `
}

export const getAvatarStyle = (showType?: string, type?: string) => {
  const basicStyle = css`
    text-align: center;
    border-radius: 50%;
    display: inline-block;
    cursor: pointer;
    flex-shrink: 0;
  `
  if (showType === "components") {
    if (type === "list") {
      return css`
        ${basicStyle};
        width: 24px;
        height: 24px;
        line-height: 24px;
      `
    }
    return css`
      ${basicStyle};
      width: 14px;
      height: 14px;
      line-height: 14px;
    `
  }

  return css`
    ${basicStyle};
    width: 32px;
    height: 32px;
    line-height: 32px;
  `
}

export const triggerStyle = css`
  z-index: 10;
`
