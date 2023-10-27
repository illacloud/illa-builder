import { SerializedStyles, css } from "@emotion/react"
import { Variants } from "framer-motion"
import { getColor, globalColor, illaPrefix } from "@illa-design/react"

const getPanelBarHeaderHeight = (size: "default" | "small") => {
  switch (size) {
    case "small": {
      return css`
        height: 32px;
      `
    }
    default:
    case "default": {
      return css`
        height: 48px;
      `
    }
  }
}

const getPanelBarHeaderBorder = (size: "default" | "small") => {
  switch (size) {
    case "small": {
      return null
    }
    default:
    case "default": {
      return css`
        &:not(:first-of-type) {
          border-top: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
        }
      `
    }
  }
}

export const applyPanelBarHeaderStyle = (
  size: "default" | "small",
): SerializedStyles => {
  const heightCss = getPanelBarHeaderHeight(size)
  const borderCss = getPanelBarHeaderBorder(size)
  return css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    ${heightCss};
    ${borderCss};
    padding: 0 16px;
    padding-right: 16px;
  `
}

const getPanelTitleFontStyle = (size: "default" | "small") => {
  switch (size) {
    case "small": {
      return css`
        color: ${getColor("grayBlue", "03")};
        font-size: 12px;
        font-weight: 500;
        font-family: "Inter", serif;
      `
    }
    case "default":
    default: {
      return css`
        color: ${getColor("grayBlue", "02")};
        font-weight: 500;
        font-size: 14px;
      `
    }
  }
}

export const applyPanelBarTitleStyle = (
  size: "default" | "small",
): SerializedStyles => {
  return css`
    ${getPanelTitleFontStyle(size)};
    overflow: hidden;
    text-overflow: ellipsis;
  `
}

const getIconColorStyle = (size: "default" | "small") => {
  switch (size) {
    case "small": {
      return css`
        color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
      `
    }
    case "default":
    default: {
      return css`
        color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
      `
    }
  }
}

export function applyPanelBarOpenedIconStyle(
  isOpened: boolean,
  size: "default" | "small",
): SerializedStyles {
  const fontColorStyle = getIconColorStyle(size)
  const rotate = isOpened
    ? ""
    : css`
        transform: rotate(180deg);
      `
  return css`
    transition: transform 200ms;
    transform-origin: center;
    font-size: 16px;
    ${fontColorStyle};
    ${rotate}
  `
}

export const panelBarItemContentStyle = css`
  font-size: 14px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  position: relative;
  height: auto;
  padding-bottom: 4px;
`

export const panelBarItemContainerAnimationVariants: Variants = {
  enter: {
    height: "auto",
    overflowY: "hidden",
    transitionEnd: { overflowY: "visible" },
  },
  exit: {
    height: 0,
    overflowY: "hidden",
    transitionEnd: { overflowY: "hidden" },
  },
}

export const customIconHotpotStyle = css`
  font-size: 16px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  :hover {
    color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  }
  :active {
    color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  }
`
