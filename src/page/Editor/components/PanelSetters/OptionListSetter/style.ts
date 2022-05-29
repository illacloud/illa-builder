import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

const publicPaddingCss = css`
  padding: 0 16px;
`

export const optionListHeaderCss = css`
  width: 100%;
  background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
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
  border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  margin: 0 16px;
  border-radius: 8px;
`

export const optionListItemCss = css`
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
  height: 40px;
  align-items: center;
  cursor: pointer;

  &:hover {
    .movableIconWrapper {
      opacity: 1;
    }
  }
`

export const labelNameAndIconCss = css`
  width: 100%;
  display: flex;
  align-items: center;
`

export const labelNameWrapper = css`
  font-size: 14px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
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

export const modalInputWrapperCss = css`
  width: 240px;
`

export const modalLabelCss = css`
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
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
