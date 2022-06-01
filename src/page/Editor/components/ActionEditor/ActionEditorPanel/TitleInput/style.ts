import chroma from "chroma-js"
import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const titleContainerStyle = css`
  display: flex;
  align-items: center;
  width: 280px;
  max-width: 280px;
  border-radius: 8px;
  box-sizing: border-box;
  height: 32px;
  line-height: 32px;
  transition: all 0.2s ease-in-out;
  padding: 0 19px 0 16px;

  &:hover {
    cursor: pointer;
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};

    & > svg {
      opacity: 1;
    }
  }
`

export const titleInputContainerStyle = css`
  width: 280px;
  max-width: 280px;
  border-radius: 8px;
  box-sizing: border-box;
  height: 32px;
  padding: 0px 19px 0 16px;
`

export const titleInputStyle = css`
  & > span {
    border-color: ${globalColor(`--${illaPrefix}-techPurple-01`)}!important;
    box-shadow: 0 0 8px 0
      ${chroma(globalColor(`--${illaPrefix}-techPurple-01`))
    .alpha(0.2)
    .hex()};
  }
`

export const titleStyle = css`
  display: inline-block;
  max-width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const titleEditIconStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
  transition: all 0.2s ease-in-out;
  opacity: 0;
`
