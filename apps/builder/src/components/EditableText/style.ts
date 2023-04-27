import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const editableTextWrapperStyle = css`
  width: 100%;
  border-radius: 8px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
    cursor: pointer;

    svg {
      opacity: 1;
    }
    .text-container {
      padding-left: 16px;
    }
  }
  transition: all 200ms;
`

export const textStyle = css`
  height: 100%;
  display: inline-flex;
  min-height: 32px;
  font-size: 14px;
  align-items: center;
  box-sizing: border-box;
  max-lines: 1;
  white-space: nowrap;
  border-radius: 8px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  font-weight: 500;
  position: relative;
  svg {
    width: 14px;
    height: 14px;
    margin-left: 8px;
    opacity: 0;
    color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
    transition: all 200ms;
  }
  transition: all 200ms;
`

export const innerTextStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  svg {
    position: absolute;
    right: -22px;
  }
`
