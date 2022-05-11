import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

const publicPaddingCss = css`
  padding: 0 16px;
  box-sizing: border-box;
`

export const headerWrapperCss = css`
  display: flex;
  width: 100%;
  height: 48px;
  justify-content: space-between;
  align-items: center;
  ${publicPaddingCss}
`

export const headerIconWrapperCss = css`
  cursor: pointer;
`

export const baseLabelCss = css`
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
`

export const labelTipsCss = css`
  ${baseLabelCss};
  border-bottom: 1px dashed ${globalColor(`--${illaPrefix}-grayBlue-07`)};
`

export const singleInputCss = css`
  flex: 0 0 184px;
`

export const singleSetterCss = css`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
