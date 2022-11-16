import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"
import { Variants } from "framer-motion"

export const errorContainerStyle = css`
  background-color: ${globalColor(`--${illaPrefix}-techPink-07`)};
`

export const errorItemStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  height: 38px;
  z-index: 1;
`

export const nameStyle = css`
  cursor: pointer;
  color: ${globalColor(`--${illaPrefix}-grayBlue-03`)};
  margin-right: 8px;
`

export const sourceStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-03`)};
  text-decoration-line: underline;
  cursor: pointer;
  &:hover {
    color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  }
`

export const errorIconStyle = css`
  color: ${globalColor(`--${illaPrefix}-red-03`)};
`

export const errorExpandStyle = css`
  padding: 2px 4px;
  margin: 0 4px;
`

export function applyExpandIconStyle(expanded?: boolean): SerializedStyles {
  const rotate = expanded ? 90 : 0
  return css`
    display: inline-flex;
    font-size: 8px;
    line-height: 0;
    cursor: pointer;
    transform-origin: center;
    transform: rotate(${rotate}deg);
    transition: transform 200ms;
  `
}

export const jsonStyle = css`
  padding-left: 56px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
`

export const errorMessageStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  text-decoration-line: underline;
  cursor: pointer;
`

export const jsonContentAnimation: Variants = {
  enter: { height: "unset", opacity: 1, visibility: "visible" },
  exit: { height: 0, opacity: 0, visibility: "hidden" },
}
