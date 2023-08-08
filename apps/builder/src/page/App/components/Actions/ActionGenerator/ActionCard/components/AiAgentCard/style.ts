import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import gradiant from "./gradiant.png"

export const aiAgentCardStyle = css`
  width: 184px;
  height: 56px;
  border-radius: 8px;
  background-color: #0f0e0e;
  padding: 16px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
`

export const aiAgentCardTitleStyle = css`
  font-size: 14px;
  color: ${getColor("white", "01")};
  font-weight: 500;
`

export const betaTagStyle = css`
  display: inline-flex;
  padding: 0 8px;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  background-color: rgba(255, 193, 230, 0.08);
  color: #9a4aff;
  font-size: 12px;
  font-weight: 500;
`

export const backgroundPartContainerStyle = css`
  position: absolute;
  right: 0;
  top: 0;
  background: no-repeat url(${gradiant});
  width: 72px;
  height: 56px;
  pointer-events: none;
`
