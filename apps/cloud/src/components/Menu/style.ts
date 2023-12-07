import { SerializedStyles, css } from "@emotion/react"
import { applyMobileStyle } from "@illa-public/utils"
import { globalColor, illaPrefix } from "@illa-design/react"
import { columnCenter } from "@/style"

export const menuWrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const applyLinkStyle = (selected: boolean): SerializedStyles => {
  const selectedStyle = selected
    ? css`
        background: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
        font-weight: 600;
      `
    : null

  return css`
    display: flex;
    align-items: center;
    padding: 9px 24px;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
    cursor: pointer;
    ${selectedStyle};
  `
}

export const iconStyle = css`
  ${columnCenter};
  width: 24px;
  height: 24px;
  margin-right: 12px;
  color: inherit;
`

export const subMenuWrapperStyle = css`
  padding: 10px 40px;

  ${applyMobileStyle(css`
    padding: 20rem 70rem;
  `)}
`

// Mobile

export const mobileMenuWrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8rem;
`

export const applyMobileLinkStyle = (selected: boolean): SerializedStyles => {
  const selectedStyle = selected
    ? css`
        background: ${globalColor(`--${illaPrefix}-techPurple-08`)};
        color: ${globalColor(`--${illaPrefix}-techPurple-03`)};
        font-weight: 500;
      `
    : null

  return css`
    display: flex;
    align-items: center;
    padding: 20rem 32rem;
    font-weight: 400;
    font-size: 32rem;
    line-height: 40rem;
    color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
    cursor: pointer;
    ${selectedStyle};
  `
}

export const mobileIconStyle = css`
  ${columnCenter};
  width: 48rem;
  height: 48rem;
  margin-right: 12px;
  color: inherit;
  & > svg {
    width: 48rem;
    height: 48rem;
  }
`
