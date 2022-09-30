import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const paramListWrapperStyle = css`
  display: flex;
  flex-direction: column;
`

export const paramItemStyle = css`
  display: flex;

  & + & {
    margin-top: 8px;
  }
`

export const paramItemKeyStyle = css`
  width: 169px !important;

  & > span {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
`

export function applyParamItemValueStyle(isFocus: boolean): SerializedStyles {
  return css`
    & > span {
      ${!isFocus &&
        css`
          border-left: 0px;
        `}
      transition: all .2s ease-in-out;
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    }
  `
}

export const newButtonStyle = css`
  display: flex;
  align-items: center;
  align-self: flex-start;
  padding-top: 8px !important;

  & svg {
    margin-right: 5px;
    margin-bottom: 2px;
  }
`

export const deleteIconStyle = css`
  cursor: pointer;
  color: ${globalColor(`--${illaPrefix}-grayBlue-07`)};

  &:hover {
    color: ${globalColor(`--${illaPrefix}-red-05`)};
  }
`
