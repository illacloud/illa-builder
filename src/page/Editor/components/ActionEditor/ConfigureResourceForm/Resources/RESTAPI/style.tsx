import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/serialize"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const GridContainerGapCSS = css`
  gap: 8px;
`

export const LabelAlignSelfFlexStartCSS = css`
  align-self: flex-start;
  margin-top: 5px;
`

export const InputTagSmallSizeCSS = css`
  height: 32px;
`

export const CheckboxCSS = css`
  margin: -8px 0 8px;

  & > input {
    margin: 0;
  }
`
