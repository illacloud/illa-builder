import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const createFolderModalMaskStyle = css`
  background-color: ${getColor("white", "05")};
  backdrop-filter: blur(5px);
`

export const invalidTipsStyle = css`
  display: inline-flex;
  color: ${getColor("orange", "03")};
  font-size: 14px;
  margin-top: 4px;
`

export const messageStyle = css`
  display: inline-flex;
  color: ${getColor("grayBlue", "04")};
  font-size: 14px;
  margin-top: 4px;
`
