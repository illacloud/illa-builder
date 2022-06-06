import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

/**
 * @param scale 0 ~ 100+
 * @param height default 100% , or number for px
 */
export function applyScaleStyle(
  scale: number,
  height: number | null,
): SerializedStyles {
  let finalHeight: string
  if (height == null) {
    finalHeight = "100%"
  } else {
    finalHeight = `${height}px`
  }
  const trans = scale / 100.0
  return css`
    padding: 6px;
    box-sizing: border-box;
    width: 100%;
    min-width: 948px;
    min-height: 948px;
    height: ${finalHeight};
    transform: scale(${trans});
    transform-origin: 50% 0;
  `
}

export const dotStyle = css`
  height: 2px;
  width: 2px;
  border-radius: 1px;
  background: ${globalColor(`--${illaPrefix}-grayBlue-08`)};
`

export const dotRowsStyle = css`
  height: 8px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
