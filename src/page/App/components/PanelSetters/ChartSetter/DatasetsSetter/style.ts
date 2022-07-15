import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

const publicPaddingCss = css`
  padding: 0 16px;
`

export const headerStyle = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  color: ${globalColor(`--${illaPrefix}-blackAlpha-05`)};
  font-size: 16px;
  font-weight: 500;
  span {
    display: flex;
    align-items: center;
  }
  ${publicPaddingCss}
`

export const buttonContainerStyle = css`
  width: 100%;
  padding: 0 16px;
`

export const removeButtonStyle = css`
  width: 100%;
  justify-content: center;
`

export const labelHeightStyle = css`
  display: inline-flex;
  align-items: center;
  height: 40px;
`

export const closeIconStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14px;
  height: 14px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  cursor: pointer;
`

export const optionListHeaderCss = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  font-weight: 500;
  padding: 0 24px 0 16px;
  box-sizing: border-box;
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
  margin: 0 16px;
  border-radius: 8px;
`

export function applyOptionListItemStyle(close: boolean = false) {
  return css`
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    cursor: pointer;
    border-radius: 8px;
    color: ${close
      ? globalColor(`--${illaPrefix}-grayBlue-05`)
      : globalColor(`--${illaPrefix}-grayBlue-02`)};
    transition: background-color 200ms;
    svg {
      height: 16px;
      width: 16px;
      margin: 0 17px;
      color: ${close
        ? globalColor(`--${illaPrefix}-grayBlue-08`)
        : globalColor(`--${illaPrefix}-grayBlue-05`)};
      :hover {
        color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
      }
    }
    &:hover {
      .movableIconWrapper {
        opacity: 1;
      }
    }
  `
}

export const labelNameAndIconCss = css`
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 12px;
  align-items: center;

  div {
    height: 100%;
    display: flex;
    align-items: center;
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
export function applyIconStyle(close = false) {
  return css`
    color: ${close
      ? globalColor(`--${illaPrefix}-grayBlue-05`)
      : globalColor(`--${illaPrefix}-grayBlue-08`)};
    :hover {
      color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
    }
  `
}
