import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

const publicPaddingCss = css`
  padding: 0 16px;
`

export const optionListHeaderCss = css`
  width: 100%;
  background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  font-weight: 500;
  box-sizing: border-box;
  ${publicPaddingCss}
`

export const ListCss = css`
  border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  margin: 16px 16px 0 16px;
  border-radius: 8px;
`

export const listWrapperCss = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 12px 16px;
`

export const labelAndInputWrapperCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
`

export const modalInputWrapperCss = css`
  width: 175px;
`

export const modalLabelCss = css`
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`
