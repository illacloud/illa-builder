import { css } from "@emotion/react"
import {
  HEADER_HEIGHT,
  MAX_MOBILE_WIDTH,
} from "@/widgetLibrary/Mobile/CameraWidget/constant"

export const containerStyle = css`
  height: calc(100% - ${HEADER_HEIGHT}px);
  width: 100%;
  max-width: ${MAX_MOBILE_WIDTH}px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: ${HEADER_HEIGHT}px;
`
