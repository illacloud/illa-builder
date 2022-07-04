import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { colorSchemes } from "@/widgetLibrary/PublicSector/colorSchemeOptions"
import {
  HorizontalAlign,
  VerticalAlign,
} from "@/widgetLibrary/TextWidget/interface"

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
  `
}

export function applyTextStyle(
  textColor?: string,
  linkColor?: string,
  backgroundColor?: string,
): SerializedStyles {
  return css`
    color: ${globalColor(`--${illaPrefix}-${textColor}-01`)};
    background-color: ${backgroundColor &&
    colorSchemes.includes(backgroundColor)
      ? globalColor(`--${illaPrefix}-${backgroundColor}-01`)
      : "transparent"};
    ${applyLinkStyle(linkColor)}
  `
}

export function applyLinkStyle(linkColor?: string): SerializedStyles {
  return linkColor
    ? css`
        a {
          cursor: pointer;
          color: ${globalColor(`--${illaPrefix}-${linkColor}-01`)};
        }
      `
    : css``
}
