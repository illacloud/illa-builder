import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import { HEADER_HEIGHT, MAX_MOBILE_WIDTH, RATIO } from "../../../constant"

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
  height: 40px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 3px 24px;
`

export const cancelStyle = css`
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`

export const noPermissionStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  max-width: ${MAX_MOBILE_WIDTH}px;
  height: calc(100% - ${HEADER_HEIGHT}px);
  top: ${HEADER_HEIGHT}px;
  & span {
    width: 196px;
    color: ${getColor("white", "01")};
    text-align: center;
    font-size: 14px;
    font-weight: 500;
  }
`

export const countdownStyle = css`
  position: absolute;
  left: 50%;
  display: flex;
  min-width: 80px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  color: ${getColor("white", "01")};
  background-color: ${getColor("blackAlpha", "04")};
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 500;
  z-index: 1;
  transform: translateX(-50%);
`

export const videoContainerStyle = css`
  margin: 20px 0;
  width: 100%;
  position: relative;
`

export const videoStyle = css`
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: ${RATIO};
  background-color: ${getColor("grayBlue", "08")};
  position: relative;
  & video {
    width: 100%;
  }
`
