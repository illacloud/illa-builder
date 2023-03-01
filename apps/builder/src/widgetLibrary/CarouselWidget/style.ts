import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const sliderStyle = css`
  height: 100%;

  .slick-track {
    inset-inline-start: 0;
  }
  .slick-dotted.slick-slider {
    margin-bottom: 30px;
  }

  .slick-dots {
    bottom: 8px;
    z-index: 1;

    position: absolute;
    display: block;
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: center;
  }

  .slick-dots li {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    width: 8px;
    height: 12px;
    margin: 0 4px;
  }

  .slick-dots li button {
    font-size: 0;
    line-height: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 10px;
    height: 10px;
    padding: 0;
    color: transparent;
    border: 0;
    outline: none;
    background: transparent;
    transition: opacity 0.2s;
  }
  .slick-dots li button:focus:before {
    opacity: 0.25;
  }

  .slick-dots li button:before {
    font-size: 6px;
    line-height: 20px;
    scale: 0.4;

    width: 20px;
    height: 20px;

    opacity: 0.25;
    color: white;
    top: unset;
    left: unset;

    &:hover {
      opacity: 1;
    }
  }

  .slick-dots li.slick-active button {
    opacity: 0.75;
    color: white;

    &:before {
      opacity: 1;
      color: white;
    }
  }

  .slick-prev,
  .slick-next {
    z-index: 1;
    font-size: 12px;
    width: 16px;
    height: 16px;
    color: white;
    border-radius: 50%;
    padding: 2px;

    &:hover {
      color: white;
      background: ${getColor("blackAlpha", "07")};
    }
  }

  .slick-prev {
    left: 8px;
  }

  .slick-next {
    right: 8px;
  }

  .slick-list,
  .slick-track,
  .slick-slide > div {
    height: 100%;
  }
`
export const dotStyle = css`
  width: 4px;
  height: 4px;
  cursor: pointer;
  background: white;
  opacity: 0.25;
`

export const fullHeightStyle = css`
  height: 100%;
`

export const fullImageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
