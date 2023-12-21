import { css } from "@emotion/react"
import { applyMobileStyle } from "@illa-public/utils"
import { getColor } from "@illa-design/react"

export const modalStyle = css`
  min-width: auto;
  width: auto;
  ${applyMobileStyle(css`
    width: 716rem;
    min-width: 716rem;
  `)}
`
export const modalMaskStyle = css`
  background-color: ${getColor("white", "05")};
  backdrop-filter: blur(5px);
`

export const changeLogContainerStyle = css`
  overflow: hidden;
`

export const headerStyle = css`
  position: relative;
`

export const closeIconStyle = css`
  position: absolute;
  width: 24px;
  height: 24px;
  line-height: 10px;
  text-align: center;
  top: 16px;
  right: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${getColor("grayBlue", "02")};
`
export const contentStyle = css`
  overflow-y: auto;
  padding: 32px;
  max-height: 480px;
  width: 488px;
  ${applyMobileStyle(css`
    width: 100%;
  `)}
`
export const lineContainerStyle = css`
  padding: 0;
  margin-bottom: 32px;
  &:last-of-type {
    margin-bottom: 0;
  }
`

export const itemContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  ul,
  ol {
    padding-left: 16px;
  }
`

export const itemTitleStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`

export const linkStyle = css`
  display: flex;
  padding: 0;
`

export const changeBgStyle = css`
  display: flex;
  width: 100%;
`
