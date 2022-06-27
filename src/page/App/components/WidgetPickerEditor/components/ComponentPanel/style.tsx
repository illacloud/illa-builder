import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const componentContainerStyle = css`
  border-top: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  width: 100%;
`
export const searchWrapperStyle = css`
  padding: 16px;
`

export const sessionListContainerStyle = css`
  ${searchWrapperStyle};
  padding-top: 0;
  padding-bottom: 0;
  max-height: calc(100vh - 150px);
  overflow-y: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const sessionContainerStyle = css`
  height: 100%;
  width: 100%;
  display: inline-flex;
  flex-direction: column;
`

export const sessionTitleStyle = css`
  height: 38px;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
`

export const componentListContainerStyle = css`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 88px);
  gap: 16px 8px;
`

export const itemContainerStyle = css`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 88px;
`

export const dragPreviewStyle = css`
  position: absolute;
  background: transparent;
  top: 0;
  left: 0;
  height: 1px;
  width: 1px;
`

export const iconStyle = css`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${hexToRGBA(
    globalColor(`--${illaPrefix}-grayBlue-09`),
    0.5,
  )};
  cursor: grab;

  &:hover {
    background-color: ${hexToRGBA(
      globalColor(`--${illaPrefix}-techPurple-07`),
    )};
    transform: scale(1.1);
  }

  transition: 0.15s ease-in-out;
  transition-property: transform;
  will-change: transform;
`

export const nameStyle = css`
  font-size: 12px;
  width: 100%;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  text-overflow: ellipsis;
  box-sizing: border-box;
  padding: 4px 8px 0 8px;
  overflow: hidden;
  text-align: center;
`

export const emptyStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: 122.5px;
  flex-direction: column;
  align-items: center;
`

export const emptyTipStyle = css`
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
