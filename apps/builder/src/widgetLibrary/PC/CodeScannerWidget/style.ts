import { css } from "@emotion/react"
import { applyMobileStyle } from "@illa-public/utils"
import { getColor } from "@illa-design/react"

export const fullStyle = css`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
`

export const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  padding: 24px;
  position: relative;
`

export const iconStyle = css`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 12px;
  :hover {
    background-color: ${getColor("grayBlue", "09")};
  }
`

export const modalStyle = css`
  border: unset;
  width: 486px;
  min-width: 486px;
  background: ${getColor("white", "01")};
  border: 1px solid ${getColor("grayBlue", "08")};
  box-shadow: 0 4px 16px rgb(0 0 0 / 8%);
  border-radius: 8px;
  overflow: hidden;

  ${applyMobileStyle(css`
    width: 358px;
    min-width: 358px;
    border-radius: 8px;
  `)}
`

export const readerContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 24px;
`

export const readerStyle = css`
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  min-height: 328px;
  border-radius: 8px;
  background-color: ${getColor("grayBlue", "08")};
  & video {
    max-width: 100%;
    width: 100%;
    min-height: 232px;
  }
`

export const successContentStyle = css`
  width: 100%;
  text-align: center;
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-weight: 400;
  word-wrap: break-word;
`
