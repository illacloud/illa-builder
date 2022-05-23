import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const FieldArrayWrapperCSS = css`
  display: flex;
  flex-direction: column;
`

export const FieldItemCSS = css`
  display: flex;
  align-items: center;

  & + & {
    margin-top: 16px;
  }
`

export const FieldItemKeyCSS = css`
  width: 160px;

  & > .CodeMirror {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`

export const FieldItemTypeCSS = css`
  width: 120px !important;
  border-radius: 0 !important;
  & > div {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
`

export const FieldItemValueCSS = css`
  flex: 1;

  & > .CodeMirror {
    border-radius: 0;
  }
`

export const NewButtonCSS = css`
  display: flex;
  align-items: center;
  align-self: flex-start;
  padding-top: 8px !important;

  & svg {
    margin-right: 5px;
    margin-bottom: 2px;
  }
`

export const DeleteIconWrapper = css`
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

export const ActionTextCSS = css`
  cursor: pointer;
  color: ${globalColor(`--${illaPrefix}-techPurple-01`)};
  transition: color 0.2s ease-in-out;
  justify-self: start;
  background-color: transparent;
  border: 0;
  padding: 0;
  margin: 0;

  &:hover {
    color: ${globalColor(`--${illaPrefix}-techPurple-03`)};
  }
`
