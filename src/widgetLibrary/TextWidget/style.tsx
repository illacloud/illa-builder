import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { colorSchemes } from "@/widgetLibrary/PublicSector/colorSchemeOptions"
import {
  HorizontalAlign,
  VerticalAlign,
} from "@/widgetLibrary/TextWidget/interface"

const innerColor = [
  "blackAlpha",
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "cyan",
  "purple",
  "grayBlue",
  "techPurple",
  "techPink",
]
export const applyTextContainerStyle = (
  horizontalAlign: HorizontalAlign = "start",
  verticalAlign: VerticalAlign = "start",
): SerializedStyles => {
  return css`
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: ${horizontalAlign};
    align-items: ${verticalAlign};
    p {
      margin: 0;
    }
    a:visited {
      color: #c58af9;
    }
  `
}

export function applyTextStyle(
  textColor?: string,
  linkColor?: string,
  backgroundColor?: string,
): SerializedStyles {
  const _color =
    textColor && innerColor.indexOf(textColor) > -1
      ? globalColor(`--${illaPrefix}-${textColor}-01`)
      : textColor
  return css`
    white-space: pre-wrap;
    color: ${_color ?? globalColor(`--${illaPrefix}-grayBlue-01`)};
    background-color: ${backgroundColor &&
    colorSchemes.includes(backgroundColor)
      ? globalColor(`--${illaPrefix}-${backgroundColor}-01`)
      : "transparent"};
    ${applyLinkStyle(linkColor)}
  `
}

export function applyLinkStyle(linkColor?: string): SerializedStyles {
  const _linkColor =
    linkColor && innerColor.indexOf(linkColor) > -1
      ? globalColor(`--${illaPrefix}-${linkColor}-01`)
      : linkColor
  return linkColor
    ? css`
        a {
          cursor: pointer;
          color: ${_linkColor};
        }
      `
    : css``
}
