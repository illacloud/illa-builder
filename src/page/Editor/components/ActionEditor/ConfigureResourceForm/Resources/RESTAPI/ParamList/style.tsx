import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/serialize"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const ParamListWrapperCSS = css`
  display: flex;
  flex-direction: column;
`

export const ParamItemCSS = css`
  display: flex;

  & + & {
    margin-top: 8px;
  }
`

export const ParamItemKeyCSS = css`
  width: 169px !important;

  & > span {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
`

export const ParamItemValueCSS = css`
  & > span {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }
`

export const NewButtonCSS = css`
  display: flex;
  align-items: center;
  align-self: flex-start;
  padding: 8px;

  & svg {
    margin-right: 5px;
    margin-bottom: 2px;
  }
`

export const DeleteIconCSS = css`
  cursor: pointer;
  color: ${globalColor(`--${illaPrefix}-grayBlue-07`)};

  &:hover {
    color: ${globalColor(`--${illaPrefix}-red-05`)};
  }
`
