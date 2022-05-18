/* Common CSS for all form */
import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/serialize"
import { globalColor, illaPrefix } from "@illa-design/theme"

type Direction = "left" | "right" | "top" | "bottom"

export const FormCSS = css`
  overflow: auto;
  padding: 0 24px;
  max-height: 716px;
`

/* form grid */
export const GridContainerCSS = css`
  display: grid;
  grid: auto/repeat(auto-fit, 152px minmax(280px, 1fr));
  grid-gap: 16px;
  white-space: nowrap;
  overflow: auto;
`

export function applyGridColIndex(index: number): SerializedStyles {
  return css`
    grid-column-start: ${index};
  `
}

export const EmptyFillingCSS = css`
  grid-column: span 2;
`

export const SplitLineCSS = css`
  display: inline-block;
  grid-column: span 2;
  height: 1px;
  width: 100%;
  background-color: ${globalColor(`--${illaPrefix}-grayBlue-08`)};
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

export const RequiredLabelTextCSS = css`
  ${LabelTextCSS}
  position: relative;

  &:before {
    content: "*";
    margin-right: 5px;
    margin-top: 5px;
    font-weight: bold;
    color: ${globalColor(`--${illaPrefix}-red-03`)};
  }
`

export const GroupTitleCSS = css`
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 1.57;
  font-weight: 500;
  text-align: right;
  margin: 0;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  grid-column: span 2;
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

export const DisplayNoneCSS = css`
  display: none;
`
export const DescriptionCSS = css`
  display: grid;
  align-items: center;
  font-size: 14px;
  line-height: 1.57;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  margin: 0;
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
