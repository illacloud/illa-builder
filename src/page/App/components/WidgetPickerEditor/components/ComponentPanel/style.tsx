import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const componentContainerCss = css`
  padding: 16px 16px;
  border-top: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  width: 100%;
`

export const sessionListContainerCss = css`
  height: 100%;
  width: 100%;
  display: inline-flex;
  flex-direction: column;
`

export const sessionContainerCss = css`
  height: 100%;
  width: 100%;
  display: inline-flex;
  flex-direction: column;
`

export const sessionTitleCss = css`
  height: 38px;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
`

export const componentListContainerCss = css`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 88px);
  justify-content: space-between;
`

export const itemContainerCss = css`
  display: inline-flex;
  position: relative;
  flex-direction: column;
  margin-bottom: 16px;
  justify-content: center;
  align-items: center;
`

export const dragPreviewStyle = css`
  position: absolute;
  background: transparent;
  top: 0;
  left: 0;
  height: 1px;
  width: 1px;
`

export const iconCss = css`
  width: 88px;
  height: 70px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: ${hexToRGBA(
    globalColor(`--${illaPrefix}-grayBlue-09`),
    0.5,
  )};

  &:hover {
    background-color: ${hexToRGBA(
      globalColor(`--${illaPrefix}-techPurple-07`),
    )};
    cursor: grab;
  }

  &:hover {
    background-color: ${hexToRGBA(
      globalColor(`--${illaPrefix}-techPurple-07`),
    )};
    cursor: grab;
  }

  transition: all 200ms;
`

export const nameCss = css`
  font-size: 12px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  max-lines: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 88px;
  word-break: break-all;
  text-overflow: ellipsis;
  box-sizing: border-box;
  padding: 4px 8px 0 8px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-align: center;
`

export const emptyCss = css`
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: 122.5px;
  flex-direction: column;
  align-items: center;
`

export const emptyTipCss = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
  margin-top: 4px;
  font-size: 14px;
`

function hexToRGBA(hex: string, alpha?: number) {
  const r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16)
  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")"
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")"
  }
}
