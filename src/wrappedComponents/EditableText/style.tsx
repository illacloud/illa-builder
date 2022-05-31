import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const inputContainerCss = css`
  display: inline-flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 4px 0;
  box-sizing: border-box;
  border-bottom: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
`

export const textCss = css`
  width: 100%;
  height: 32px;
  max-height: 32px;
  padding: 0 21px;
  display: inline-flex;
  font-size: 14px;
  align-items: center;
  box-sizing: border-box;
  max-lines: 1;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 8px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  &:hover {
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
    cursor: pointer;
    svg {
      opacity: 1;
    }
  }
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
