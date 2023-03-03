import { css } from "@emotion/react"

const FONT_SIZE = (100 / 780) * 100
export const MOBILE_MIN_WIDTH = 320
export const MOBILE_MAX_WIDTH = 780

export const globalStyle = css`
  html {
    // when vw doesn't work
    font-size: 41px;
    // vw works
    font-size: ${FONT_SIZE}vw;
    @media screen and (orientation: landscape) {
      font-size: ${FONT_SIZE}vh;
    }
    @media screen and (max-width: 320px) {
      font-size: 41px;
    }
    @media screen and (min-width: 780px) {
      font-size: 16px;
    }
    --dvh: 1dvh;
  }

  html,
  body,
  #root {
    height: 100%;
    width: 100%;
  }
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

export const pxToRem = (px: number) => {
  return `${px / 100}rem`
}

export const messageStyle = css`
  @media screen and (max-width: ${MOBILE_MAX_WIDTH}px) {
    border-radius: 16rem;
  }
`
