import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const globalStyle = css`
  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
