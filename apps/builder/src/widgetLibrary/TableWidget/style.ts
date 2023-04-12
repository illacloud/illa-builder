import { css } from "@emotion/react"

export const overFlowStyle = css`
  & > span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
