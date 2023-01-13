import { SerializedStyles, css } from "@emotion/react"
import { Variants } from "framer-motion"
import { globalColor, illaPrefix } from "@illa-design/react"
import { publicPaddingStyle } from "@/page/App/components/InspectPanel/style"

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
    ${publicPaddingStyle};
  `
}

const getPanelTitleFontStyle = (size: "default" | "small") => {
  switch (size) {
    case "small": {
      return css`
        font-size: 12px;
        font-weight: 600;
        font-family: "Inter", serif;
      `
    }
    case "default":
    default: {
      return css`
        font-weight: 500;
        font-size: 14px;
      `
    }
  }
}

export const applyPanelBarTitleStyle = (
  size: "default" | "small",
): SerializedStyles => {
  const fontStyle = getPanelTitleFontStyle(size)
  return css`
    color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
    ${fontStyle};
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
    font-size: 12px;
    ${fontColorStyle};
    ${rotate}
  `
}

export const panelBarItemContentStyle = css`
  font-size: 14px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  position: relative;
`

export const panelBarItemAnimation: Variants = {
  enter: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
}

export const addIconHotpotStyle = css`
  font-size: 12px;
  width: 16px;
  height: 16px;
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
