import { css, keyframes } from "@emotion/react"
import { LEFT_PANEL_WIDTH, RIGHT_PANEL_WIDTH, NAVBAR_HEIGHT } from "@/style"
import { globalColor, illaPrefix } from "@illa-design/theme"
import {
  applyLeftPanelStyle,
  applyRightPanelStyle,
  navbarStyle,
} from "@/page/App/style"

const enlargeNavBar = keyframes`
  0% {
    transform: translate3d(0, -${NAVBAR_HEIGHT}px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`

const enlargeLeftPanel = keyframes`
  0% {
    transform: translate3d(-${LEFT_PANEL_WIDTH}px, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`

const enlargeRightPanel = keyframes`
  0% {
    transform: translate3d(${RIGHT_PANEL_WIDTH}px, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`

export const leftPanelStyle = css`
  ${applyLeftPanelStyle(true)}
  transform: translate3d(-${LEFT_PANEL_WIDTH}px, 0, 0);
  animation: ${enlargeLeftPanel} 300ms ease-in-out 200ms forwards;
`
export const rightPanelStyle = css`
  ${applyRightPanelStyle(true)}
  transform: translate3d(${RIGHT_PANEL_WIDTH}px, 0, 0);
  animation: ${enlargeRightPanel} 300ms ease-in-out 200ms forwards;
`

export const navStyle = css`
  ${navbarStyle};
  background: ${globalColor(`--${illaPrefix}-white-01`)};
  animation: ${enlargeNavBar} 300ms ease-in-out;
  border-bottom: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
`

export const loadingStyle = css`
  background: #fafafb;
  display: flex;
  flex-direction: column;
  height: 100%;
`
