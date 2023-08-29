import { SerializedStyles, css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const agentContent = css`
  flex-grow: 1;
  overflow: hidden;
  margin-top: 16px;
  padding: 0 15%;
  display: flex;
  flex-direction: column;
`

export const menuContainerStyle = css`
  display: flex;
  margin-bottom: 40px;
  flex-direction: row;
  align-items: center;
`

export const fallbackLoadingStyle: SerializedStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
  color: ${getColor("techPurple", "01")};
`
