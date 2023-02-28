import { css } from "@emotion/react"

export const sliderStyle = css`
  height: 100%;

  .slick-dots {
    position: absolute;
    bottom: 0;
    display: block;
    z-index: 2;
  }

  .slick-list,
  .slick-track,
  .slick-slide:first-of-type {
    height: 100%;
  }
`

export const fullHeightStyle = css`
  height: 100%;
`
