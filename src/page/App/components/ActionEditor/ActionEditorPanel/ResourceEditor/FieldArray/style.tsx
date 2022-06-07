import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const fieldArrayWrapperStyle = css`
  display: flex;
  flex-direction: column;
`

export const fieldItemStyle = css`
  display: flex;
  align-items: center;

  & + & {
    margin-top: 16px;
  }
`

export const fieldItemKeyStyle = css`
  width: 160px;

  & > .CodeMirror {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`

export const fieldItemTypeStyle = css`
  width: 120px !important;
  border-radius: 0 !important;
  & > div {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
`

export const fieldItemValueStyle = css`
  flex: 1;

  & > .CodeMirror {
    border-radius: 0;
  }
`

export const newButtonStyle = css`
  margin-top: 8px !important;
`

export const deleteIconWrapperStyle = css`
  align-items: center;
  display: flex;
  height: 32px;
  padding: 10px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border: 1px solid ${globalColor(`--${illaPrefix}-gray-08`)};
  border-left: 0;
  cursor: pointer;
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};

  &:hover {
    color: ${globalColor(`--${illaPrefix}-red-05`)};
  }
`
