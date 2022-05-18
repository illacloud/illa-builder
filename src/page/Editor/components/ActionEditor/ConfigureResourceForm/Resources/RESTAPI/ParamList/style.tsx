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
  align-self: flex-start;
  display: flex;
  align-items: center;
  padding: 8px !important;

  & svg {
    margin-right: 5px;
    margin-bottom: 4px;
  }
`

export const DeleteIconCSS = css`
  cursor: pointer;
  color: ${globalColor(`--${illaPrefix}-grayBlue-07`)};

  &:hover {
    color: ${globalColor(`--${illaPrefix}-red-05`)};
  }
`
