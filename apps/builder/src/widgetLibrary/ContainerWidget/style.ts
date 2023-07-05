import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"

export const keyPressComponentStyle = css`
  padding: 2px 6px;
  border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  border-radius: 4px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04);
`

export const emptyStateStyle = css`
  font-size: 14px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  text-align: center;
`

export const applyEmptyStateWrapperStyle = css`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${15 * UNIT_HEIGHT}px;
`

export const containerWrapperStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
`
