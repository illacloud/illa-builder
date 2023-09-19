import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

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

  :not(:first-of-type) {
    margin-top: 8px;
  }

  cursor: pointer;
`
export const headerWrapperStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`

export const fontButtonWrapperStyle = css`
  display: flex;
  align-items: center;
  color: ${globalColor(`--${illaPrefix}-purple-01`)};
  cursor: pointer;
  height: 24px;
  padding: 1px 8px;
  border-radius: 8px;
  font-size: 14px;

  &:hover {
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  }
`

export const fontButtonStyle = css`
  margin-left: 4px;
`

export const listItemWrapperStyle = css`
  height: 32px;
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 16px;
  }

  &:last-child {
    margin-bottom: 8px;
  }
`

export const groupWrapperStyle = css`
  width: 100%;
  height: 32px;
  display: flex;
`

export const moreIconWrapperStyle = css`
  width: 32px;
  height: 32px;
  border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  border-radius: 0 8px 8px 0;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${globalColor(`--${illaPrefix}-grayBlue-06`)};
`

export const eventAndMethodWrapperStyle = css`
  display: flex;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  border-right: none;
  border-radius: 8px 0 0 8px;
  padding: 6px 16px;
  cursor: pointer;
  font-size: 12px;
`

export const eventNameStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  min-width: 64px;
  margin-right: 8px;
  display: flex;
  align-items: center;
`

export const methodNameStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  display: flex;
  align-items: center;
`

export const emptyBodyStyle = css`
  min-height: 32px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  color: ${globalColor(`--${illaPrefix}-grayBlue-03`)};
  margin-bottom: 8px;
  border-radius: 8px;
  font-size: 14px;
`
