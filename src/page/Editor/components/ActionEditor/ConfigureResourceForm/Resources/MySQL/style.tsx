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

export const FooterCSS = css`
  width: 100%;
  padding: 24px;
  display: flex;
  justify-content: end;
  align-items: center;
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
  grid-template-columns: 330px 142px;
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

export const BackAreaCSS = css`
  position: relative;
  padding-left: 16px;
`

export const BackTextCSS = css`
  display: inline-block;
  font-size: 14px;
  line-height: 1.57;
`

export const BackIconCSS = css`
  display: inline-block;
  font-size: 12px;
  line-height: 0;
  position: absolute;
  top: 5px;
  left: 0;
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

type Direction = "left" | "right" | "top" | "bottom"

export function applyGridColIndex(index: number): SerializedStyles {
  return css`
    grid-column-start: ${index};
  `
}

export function applyMargin(
  direction: Direction,
  number: number,
): SerializedStyles {
  return css`margin-${direction}:${number}px; `
}

export function applyPadding(
  direction: Direction,
  number: number,
): SerializedStyles {
  return css`padding-${direction}:${number}px; `
}

export function applyJustifyContent(align: string): SerializedStyles {
  return css`
    justify-content: ${align};
  `
}

export function applyIllaColor(color: string, size: string): SerializedStyles {
  return css`
    color: ${globalColor(`--${illaPrefix}-${color}-${size}`)};
  `
}
