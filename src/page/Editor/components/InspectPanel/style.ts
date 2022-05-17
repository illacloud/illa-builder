import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { Variants } from "framer-motion"

export const publicPaddingCss = css`
  padding: 0 16px;
  box-sizing: border-box;
`

export const baseLabelCss = css`
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
`

export const labelTipsCss = css`
  ${baseLabelCss};
  border-bottom: 1px dashed ${globalColor(`--${illaPrefix}-grayBlue-07`)};
`

export const panelHeaderWrapperCss = css`
  display: flex;
  width: 100%;
  height: 48px;
  justify-content: space-between;
  align-items: center;
  ${publicPaddingCss}
`

export const panelHeaderIconWrapperCss = css`
  cursor: pointer;
`

export const panelBarWrapperCss = css``

export const panelBarHeaderCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  cursor: pointer;
  ${publicPaddingCss};
`

export const panelBarTitleCss = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
  font-weight: 500;
  font-size: 14px;
`

export function panelBarOpenedIconCss(isOpened: boolean) {
  const rotate = isOpened
    ? ""
    : css`
        transform: rotate(180deg);
      `
  return css`
    font-size: 8px;
    transition: transform 200ms;
    ${rotate}
  `
}

export const panelBarItemContentCss = css`
  font-size: 14px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  position: relative;
  overflow: hidden;
`

export const panelBarItemAnimation: Variants = {
  enter: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
}
