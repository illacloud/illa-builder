import { globalColor, illaPrefix } from "@illa-design/react"
import { css } from "@emotion/react"

export const PagePanelWrapperStyle = css`
  border-top: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  height: 100%;
  width: 100%;
  padding-bottom: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

export const PageScrollContainerWrapperStyle = css`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`

export const headerWrapperStyle = css`
  display: flex;
  height: 48px;
  align-items: center;
  padding: 0 16px;
`
