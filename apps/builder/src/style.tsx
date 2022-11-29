import { css } from "@emotion/react"

export const globalStyle = css`
  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: Inter, -apple-system, BlinkMacSystemFont, PingFang SC,
      Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
  }

  * {
    outline: none !important;
  }

  /*
  *  Use a more-intuitive box-sizing model.
  */

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`

export const LEFT_PANEL_WIDTH = 280
export const RIGHT_PANEL_WIDTH = 320
export const MIDDLE_PANEL_WIDTH = 300
export const NAVBAR_HEIGHT = 48
