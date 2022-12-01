import { css, keyframes } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"
import { leftPanelStyle, navbarStyle, rightPanelStyle } from "@/page/App/style"
import { LEFT_PANEL_WIDTH, NAVBAR_HEIGHT, RIGHT_PANEL_WIDTH } from "@/style"

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

export const leftAnimationStyle = css`
  ${leftPanelStyle};
  transform: translate3d(-${LEFT_PANEL_WIDTH}px, 0, 0);
  animation: ${enlargeLeftPanel} 300ms ease-in-out 200ms forwards;
`
export const rightAnimationStyle = css`
  ${rightPanelStyle};
  transform: translate3d(${RIGHT_PANEL_WIDTH}px, 0, 0);
  animation: ${enlargeRightPanel} 300ms ease-in-out 200ms forwards;
`

export const navStyle = css`
  ${navbarStyle};
  background: ${globalColor(`--${illaPrefix}-white-01`)};
  animation: ${enlargeNavBar} 300ms ease-in-out;
  border-bottom: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
`

export const containerStyle = css`
  background: #fafafb;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`
