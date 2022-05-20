import { css, SerializedStyles } from "@emotion/react"
import { illaPrefix, globalColor } from "@illa-design/theme"
import { publicPaddingCss } from "@/page/Editor/components/InspectPanel/style"

export const dynamicSwitchWrapperCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const customAndSwitchWrapperCss = css`
  display: flex;
  align-items: center;
`

export const applyCustomIconStyle = (
  isSelected: boolean = false,
): SerializedStyles => {
  const color = isSelected
    ? globalColor(`--${illaPrefix}-purple-01`)
    : globalColor(`--${illaPrefix}-grayBlue-06`)
  return css`
    margin-right: 10px;
    color: ${color};
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    :hover {
      cursor: pointer;
      color: ${globalColor(`--${illaPrefix}-purple-01`)};
    }
  `
}

export const labelCss = css`
  min-height: 48px;
  ${publicPaddingCss}
`
