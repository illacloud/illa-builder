import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

const publicPaddingCss = css`
  padding: 0 16px;
`

export const optionListHeaderCss = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  font-weight: 500;
  box-sizing: border-box;
  ${publicPaddingCss}
`

export const headerActionButtonCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${globalColor(`--${illaPrefix}-purple-01`)};
  cursor: pointer;
  font-weight: 400;
`

export const addIconCss = css`
  margin-right: 4px;
`

export const ListCss = css`
  border-radius: 8px;
`

export const optionListItemCss = css`
  display: flex;
  justify-content: space-between;
  height: 40px;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 200ms;
  &:hover {
    .movableIconWrapper {
      opacity: 1;
    }
  }
`

export const labelNameAndIconCss = css`
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 12px;
  align-items: center;
  svg {
    height: 16px;
    width: 16px;
    margin: 0 17px;
    color: ${globalColor(`--${illaPrefix}-grayBlue-06`)};
  }
  div {
    display: flex;
    border-radius: 8px;
    flex-grow: 1;
    padding-left: 12px;
    &:hover {
      background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
    }
  }
`
export function applyColorIndentStyle(bgColor: string): SerializedStyles {
  return css`
    height: 24px;
    width: 24px;
    border-radius: 12px;
    background-color: ${bgColor};
  `
}

export const labelNameWrapper = css`
  width: 80px;
  padding: 0 8px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const aggregationMethodStyle = css`
  width: 80px;
  flex-grow: 1;
  color: ${globalColor(`--${illaPrefix}-grayBlue-03`)};
`

export const movableIconWrapperCss = css`
  opacity: 0;
  cursor: grab;
  display: flex;
  align-items: center;
`

export const modalWrapperCss = css`
  width: 400px;
  padding: 0 4px;
`

export const modalHeaderCss = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 40px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-06`)};
  font-size: 16px;
  font-weight: 500;
  ${publicPaddingCss}
  span {
    display: flex;
    align-items: center;
  }
`

export const labelAndInputWrapperCss = css`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  justify-content: space-between;
`

export const modalInputWrapperCss = css`
  width: 240px;
`

export const modalLabelCss = css`
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  display: inline-flex;
  align-items: start;
`

export const modalCloseIconCss = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  cursor: pointer;
`

export const listWrapperCss = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 12px 0;
`

export const colorPickerContainerStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`
