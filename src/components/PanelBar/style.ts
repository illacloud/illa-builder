import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { Variants } from "framer-motion"
import { publicPaddingStyle } from "@/page/App/components/InspectPanel/style"

export const panelBarHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  cursor: pointer;
  &:not(:first-of-type) {
    border-top: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  }
  ${publicPaddingStyle};
`

export const panelBarTitleStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  font-weight: 500;
  font-size: 14px;
`

export function applyPanelBarOpenedIconStyle(
  isOpened: boolean,
): SerializedStyles {
  const rotate = isOpened
    ? ""
    : css`
        transform: rotate(180deg);
      `
  return css`
    transition: transform 200ms;
    transform-origin: center;
    color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
    ${rotate}
  `
}

export const panelBarItemContentStyle = css`
  font-size: 14px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  position: relative;
  overflow: hidden;
`

export const panelBarItemAnimation: Variants = {
  enter: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
}
