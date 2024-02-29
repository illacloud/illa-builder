import { css } from "@emotion/react"
import { applyMobileStyle } from "@illa-public/utils"
import { getColor } from "@illa-design/react"

export const aiAgentContainerStyle = css`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`

export const backTextStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
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
  box-shadow: 4px 0 16px 0 rgba(0, 0, 0, 0.06);
  flex: none;
  ${applyMobileStyle(css`
    display: none;
  `)}
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
  padding-bottom: 40px;
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
  cursor: pointer;
  color: ${getColor("grayBlue", "02")};
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`

export const rightPanelContainerStyle = css`
  height: 100%;
  width: 100%;
  display: flex;
  flex-grow: 1;
  overflow-x: hidden;
  flex-direction: column;
`

export const labelStyle = css`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
`

export const labelLogoStyle = css`
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;

  & svg {
    height: 100%;
    width: 100%;
  }
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
  color: ${getColor("techPurple", "03")};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  text-transform: capitalize;
  background: ${getColor("techPurple", "08")};
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

export const docTextContainerStyle = css`
  text-decoration: none;
`
export const docTextStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
`

export const leftPanelHeaderStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 16px 24px;
  text-decoration: none;
`

export const advancedSettingHeaderStyle = css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  padding: 8px 24px;
  color: ${getColor("grayBlue", "04")};
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
`

export const advancedSettingStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`

export const promptContainerStyle = css`
  width: 100%;
  height: 100%;
`
export const codeEditorErrorStyle = (isError: boolean) => {
  let style
  if (isError) {
    style = css`
      .cm-editor,
      .cm-editor:hover,
      .cm-editor.cm-focused {
        border-color: ${getColor("red", "03")}!important;
      }
    `
  }
  return style
}

export const advancedDivideStyle = css`
  margin-top: 8px;
  padding: 0 24px;
`
