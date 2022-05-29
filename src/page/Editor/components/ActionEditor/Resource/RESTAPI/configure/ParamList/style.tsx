import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const paramListWrapperCss = css`
  display: flex;
  flex-direction: column;
`

export const paramItemCss = css`
  display: flex;

  & + & {
    margin-top: 8px;
  }
`

export const paramItemKeyCss = css`
  width: 169px !important;

  & > span {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
`

export const paramItemValueCss = css`
  & > span {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }
`

export const newButtonCss = css`
  display: flex;
  align-items: center;
  align-self: flex-start;
  padding-top: 8px !important;

  & svg {
    margin-right: 5px;
    margin-bottom: 2px;
  }
`

export const deleteIconCss = css`
  cursor: pointer;
  color: ${globalColor(`--${illaPrefix}-grayBlue-07`)};

  &:hover {
    color: ${globalColor(`--${illaPrefix}-red-05`)};
  }
`
