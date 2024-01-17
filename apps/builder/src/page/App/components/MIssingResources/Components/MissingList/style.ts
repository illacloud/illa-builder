import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const missingListContainerStyle = css`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
`

export const columnContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const cellStyle = (width: string) => css`
  padding: 9px 0%;
  width: ${width};
  overflow: hidden;
  white-space: nowrap;
  margin: 0;
  text-overflow: ellipsis;
`

export const cellFontStyle = css`
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 500;
  color: ${getColor("grayBlue", "02")};
`

export const statusContainerStyle = (status: "completed" | "missing") => css`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${status === "missing"
    ? getColor("orange", "03")
    : getColor("green", "03")};
`

export const statusTextStyle = css`
  font-size: 12px;
  font-weight: 400;
  line-height: 22px;
`
