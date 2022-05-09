import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/serialize"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const LabelTextCSS = css`
  display: grid;
  align-items: center;
  font-size: 14px;
  line-height: 1.57;
  font-weight: 500;
  text-align: right;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)}; ;
`

export const AlignDefaultCSS = css`
  align-items: normal;
`

export const BorderBottomCSS = css`
  border-bottom: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
`

export const FooterCSS = css`
  width: 100%;
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
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

export const SwitchTextCommentCSS = css`
  font-size: 12px;
  line-height: 1.67;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`

type Direction = "left" | "right" | "top" | "bottom"

type TextAlign = "left" | "center" | "right"

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

export function applyTextAlign(align: TextAlign): SerializedStyles {
  return css`
    text-align: ${align};
  `
}

export function applyIllaColor(color: string, size: string): SerializedStyles {
  return css`
    color: ${globalColor(`--${illaPrefix}-${color}-${size}`)};
  `
}
