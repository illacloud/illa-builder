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
  width: 100%;
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
  cursor: pointer;
  background: ${getColor("grayBlue", "09")};
  width: 100px;
  height: 100px;
  border-radius: 4px;
  display: flex;
  padding: 32px 28px 22px 29px;
  justify-content: center;
  align-items: center;
`

export const uploadContentContainerStyle = css`
  color: ${getColor("grayBlue", "04")};
  display: inline-flex;
  flex-direction: column;
  align-items: center;
`

export const uploadTextStyle = css`
  text-align: center;
  margin-top: 8px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`

export const descContainerStyle = css`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
`

export const descTextStyle = css`
  margin-left: 4px;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  background: linear-gradient(90deg, #853dff 0%, #e13eff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export const formContainerStyle = css`
  flex-basis: 528px;
  min-width: 528px;
`
