import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const EditableTextWrapperStyle = css`
  width: 100%;
  border-radius: 8px;
  display: flex;
  align-items: center;
`

export const textStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  min-height: 32px;
  font-size: 14px;
  align-items: center;
  box-sizing: border-box;
  max-lines: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 8px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  font-weight: 500;
  svg {
    width: 14px;
    height: 14px;
    margin-left: 8px;
    opacity: 0;
    color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
    transition: all 200ms;
  }
  &:hover {
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
    cursor: pointer;
    padding-left: 16px;
    svg {
      opacity: 1;
    }
  }
  transition: all 200ms;
`
