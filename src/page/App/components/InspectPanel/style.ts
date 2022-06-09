import { css, SerializedStyles } from "@emotion/react"
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
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const ListLabelCss = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  font-weight: 400;
`

export function applyLabelStyle(isInList?: boolean): SerializedStyles {
  return isInList ? ListLabelCss : baseLabelCss
}

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

export function panelBarOpenedIconCss(isOpened: boolean): SerializedStyles {
  const rotate = isOpened
    ? ""
    : css`
        transform: rotate(180deg);
      `
  return css`
    font-size: 8px;
    transition: transform 200ms;
    color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
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

export const applySetterWrapperStyle = (
  isFullWidth: boolean = false,
  hasLabel: boolean = true,
  useCustomLabel: boolean = false,
  isInList: boolean = false,
): SerializedStyles => {
  if (useCustomLabel) return css``

  return isFullWidth
    ? css`
        ${publicPaddingCss};
        height: ${hasLabel ? "auto" : "48px"};
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      `
    : css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: ${isInList ? "40px" : "48px"};
        ${publicPaddingCss};
      `
}

export const unselectedTipWrapperStyle = css`
  width: 100%;
  height: 319px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const unselectedTipIconStyle = css`
  font-size: 30px;
`

export const unselectedTipTextStyle = css`
  margin-top: 4px;
  font-size: 14px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`
