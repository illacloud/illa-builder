import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/serialize"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const FormContentCSS = css`
  overflow: auto;
  padding: 0 24px;
  max-height: 716px;
`

export const LabelTextCSS = css`
  display: flex;
  align-items: center;
  justify-content: end;
  font-size: 14px;
  line-height: 1.57;
  font-weight: 500;
  text-align: right;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const LabelTextVerticalCSS = css`
  flex-direction: column;
  align-items: normal;
`

export const LabelTextSmallSizeCSS = css`
  font-size: 12px;
  line-height: 1;
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
`

export const BorderBottomCSS = css`
  border-bottom: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
`
export const GridContainerCSS = css`
  display: grid;
  grid: auto/repeat(auto-fit, 152px minmax(280px, 1fr));
  grid-gap: 16px;
  white-space: nowrap;
  overflow: auto;
`

export const DisplayNoneCSS = css`
  display: none;
`

export const HostnamePortCSS = css`
  display: grid;
  grid-column-gap: 8px;
  grid-template-columns: 1fr 142px;
`

export const UsernamePasswordCSS = css`
  display: grid;
  grid-column-gap: 8px;
  grid-template-columns: 1fr 1fr;
`

export const DescriptionCSS = css`
  display: grid;
  align-items: center;
  font-size: 14px;
  line-height: 1.57;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`

export const SwitchAreaCSS = css`
  display: flex;
  align-items: center;
`
export const SwitchDescriptionCSS = css`
  display: inline-block;
`

export const ErrorMessageCSS = css`
  font-size: 14px;
  color: ${globalColor(`--${illaPrefix}-red-03`)};
  line-height: 1.57;
  margin-top: -8px;
`

export const RequireTagCSS = css`
  margin-right: 5px;
  color: ${globalColor(`--${illaPrefix}-red-03`)};
  line-height: 0;
`
