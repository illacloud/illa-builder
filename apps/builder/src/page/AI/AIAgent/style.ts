import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const aiAgentContainerStyle = css`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`

export const backTextStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 18px;
  margin-left: 8px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`

export const leftPanelContainerStyle = css`
  height: 100%;
  width: 528px;
  display: flex;
  flex-direction: column;
  min-width: 528px;
  padding-bottom: 40px;
  box-shadow: 4px 0 16px 0 rgba(0, 0, 0, 0.06);
`

export const leftPanelCoverContainer = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
  overflow-y: hidden;
`

export const leftPanelContentContainerStyle = css`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  flex-direction: column;
`

export const leftLoadingCoverStyle = css`
  position: absolute;
  background: ${getColor("white", "03")};
  height: 100%;
  width: 100%;
  z-index: 10;
`

export const buttonContainerStyle = css`
  padding: 24px;
  border-top: 1px solid ${getColor("grayBlue", "08")};
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const leftPanelTitleTextStyle = css`
  padding: 16px 24px 24px;
  cursor: pointer;
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
  width: 100%;
  flex-direction: row;
  align-items: center;
`

export const labelTextStyle = css`
  margin-left: 8px;
  flex-grow: 1;
  flex-shrink: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

export const premiumContainerStyle = css`
  align-items: center;
  display: inline-flex;
  margin-left: 8px;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 1px 7px;
  color: ${getColor("techPurple", "01")};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  text-transform: capitalize;
  background: ${getColor("techPurple", "07")};
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

export const temperatureContainerStyle = css`
  display: flex;
  align-items: center;
`

export const temperatureStyle = css`
  color: ${getColor("grayBlue", "02")};
  text-align: center;
  font-size: 14px;
  font-style: normal;
  margin-left: 16px;
  width: 34px;
  font-weight: 400;
  line-height: 22px;
  text-transform: capitalize;
`
