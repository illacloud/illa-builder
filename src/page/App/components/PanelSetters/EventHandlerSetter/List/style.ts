import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const listItemStyle = css`
  width: 100%;
  height: 32px;
  border: solid 1px ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
  font-size: 12px;

  :not(:first-child) {
    margin-top: 8px;
  }

  cursor: pointer;
`

export const listItemTitleWrapperStyle = css`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;

  &:hover {
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  }
`

export const listItemActionContentStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  margin-left: 16px;
  margin-right: 12px;
`

export const listItemFuncContentStyle = css`
  max-width: 200px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const moreIconStyle = css`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: solid 1px ${globalColor(`--${illaPrefix}-grayBlue-08`)};

  &:hover {
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  }
`
