import { css } from "@emotion/react"
import {
  HEADER_HEIGHT,
  MAX_MOBILE_WIDTH,
} from "@/widgetLibrary/Mobile/CameraWidget/constant"

export const modalStyle = css`
  border: unset;
  width: 100%;
  min-width: 100%;
  background: black;
  border-radius: 0;
  overflow: hidden;
  margin: 0 auto;
  height: 100%;
  position: relative;
`

export const modalContentStyle = css`
  position: absolute !important;
  height: 100%;
  width: 100%;
`

export const contentStyle = css`
  width: 100%;
  max-width: ${MAX_MOBILE_WIDTH}px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const headerStyle = css`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 24px;
`

export const containerStyle = css`
  width: 100%;
  max-width: ${MAX_MOBILE_WIDTH}px;
  height: calc(100% - ${HEADER_HEIGHT}px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: ${HEADER_HEIGHT}px;
`

export const cancelStyle = css`
  color: #fff;
  display: block;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`
