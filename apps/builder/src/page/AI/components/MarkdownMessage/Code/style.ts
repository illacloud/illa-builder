import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const inlineCodeStyle = css`
  display: inline-block;
  margin: 0 4px;
  font-size: 12px;
  border-radius: 4px;
  padding: 3px 4px;
  font-weight: 450;
  line-height: 18px;
  border: 1px solid ${getColor("grayBlue", "08")};
`

export const codeBlockContainerStyle = css`
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid ${getColor("grayBlue", "08")};
`

export const codeBlockHeaderStyle = css`
  display: flex;
  padding: 4px 16px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-bottom: 1px solid ${getColor("grayBlue", "08")};
  color: #444;
  font-size: 12px;
  font-weight: 400;
`

export const copyStyle = css`
  display: flex;
  padding: 2px 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  color: ${getColor("grayBlue", "02")};
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  text-transform: capitalize;
  cursor: pointer;
`
