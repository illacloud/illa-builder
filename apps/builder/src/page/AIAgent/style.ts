import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const aiAgentContainerStyle = css`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
`

export const leftPanelContainerStyle = css`
  height: 100%;
  min-width: 528px;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 16px 0 rgba(0, 0, 0, 0.06);
`

export const leftPanelContentContainerStyle = css`
  display: flex;
  width: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  overflow-y: auto;
  flex-direction: column;
`

export const leftPanelTitleStyle = css`
  padding: 24px;
`

export const buttonContainerStyle = css`
  padding: 24px;
  border-top: 1px solid ${getColor("grayBlue", "08")};
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const leftPanelTitleTextStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`

export const rightPanelContainerStyle = css`
  height: 100%;
  display: flex;
  min-width: 672px;
  flex-grow: 1;
  flex-direction: column;
`

export const labelStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const labelTextStyle = css`
  margin-left: 8px;
`

export const uploadContainerStyle = css`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  display: flex;
  padding: 32px 28px 22px 29px;
  justify-content: center;
  align-items: center;
`

export const uploadInputStyle = css`
  display: none;
`
