import { SerializedStyles, css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const lineStyle = css`
  display: inline-block;
  width: 1px;
  height: 16px;
  margin: 0 16px;
  background-color: ${getColor("grayBlue", "08")};
`

export const windowIconBodyStyle = css`
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 2px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${getColor("grayBlue", "09")};
  }
`

export function windowIconStyle(selected: boolean): SerializedStyles {
  return css`
    flex: none;
    width: 16px;
    height: 16px;
    font-size: 16px;
    color: ${selected
      ? getColor("grayBlue", "03")
      : getColor("grayBlue", "05")};
  `
}
