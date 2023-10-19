import { css } from "@emotion/react"

const FONT_SIZE = (100 / 780) * 100
export const MOBILE_MIN_WIDTH = 320
export const MOBILE_MAX_WIDTH = 780

export const globalStyles = css`
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
    height: 100%;
  }

  body {
    min-width: 320px;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-family:
      Inter,
      -apple-system,
      BlinkMacSystemFont,
      PingFang SC,
      Microsoft YaHei,
      Helvetica Neue,
      Helvetica,
      Arial,
      sans-serif;
    height: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    outline: none !important;
    box-sizing: border-box;
  }
  #root {
    height: 100%;
  }
`

export const rowCenter = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const columnCenter = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const pointerStyle = css`
  cursor: pointer;
`

export const messageStyle = css`
  @media screen and (max-width: ${MOBILE_MAX_WIDTH}px) {
    border-radius: 16rem;
  }
`
