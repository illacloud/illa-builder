import { css } from "@emotion/react"
import { applyMobileStyle } from "@illa-public/utils"
import { getColor } from "@illa-design/react"

export const blockInputContainerStyle = css`
  height: 104px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${getColor("white", "05")};
  backdrop-filter: blur(5px);
`

export const blockInputTextStyle = css`
  color: ${getColor("grayBlue", "04")};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin-top: 4px;
  line-height: 22px;
`

export const previewChatContainerStyle = css`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const previewTitleContainerStyle = css`
  display: flex;
  width: 100%;
  flex-direction: row;
  padding: 24px;
  align-items: center;
  border-bottom: 1px solid ${getColor("grayBlue", "08")};
`

export const menuIconStyle = css`
  cursor: pointer;
  margin-right: 16px;
  flex: none;
`

export const previewTitleTextStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 18px;
  flex: 1;
  font-weight: 500;
  line-height: 24px;
`

export const inputTextContainerStyle = css`
  padding: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-top: 1px solid ${getColor("grayBlue", "08")};
  flex: none;
  ${applyMobileStyle(css`
    padding: 12px 20px;
  `)}
`

export const chatContainerStyle = css`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
  padding-bottom: 110px;
  width: 100%;
`

export const mobileInputElementStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  flex-grow: 1;
  font-style: normal;
  border: none;
  font-weight: 400;
  line-height: 22px; /* 157.143% */
  padding: 8px 8px 8px 0;

  ::placeholder {
    color: ${getColor("grayBlue", "04")};
  }
`

export const inputStyle = css`
  padding: 6px 16px;
  font-size: 14px;
  color: ${getColor("grayBlue", "02")};
  outline: none;
  line-height: 22px;
  border: none;
  flex-shrink: 1;
  width: 100%;
  flex-grow: 1;
  font-family: unset;
  background: none;
  resize: none;

  ::placeholder {
    color: ${getColor("grayBlue", "04")};
  }

  &:focus-within {
    outline: none;
    border: none;
    background: none;
  }

  &:active {
    outline: none;
    border: none;
    background: none;
  }

  &:disabled {
    cursor: not-allowed;
    color: ${getColor("grayBlue", "05")};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`

export const generatingContainerStyle = css`
  display: flex;
  justify-content: center;
  width: 100%;
  pointer-events: none;
  left: 0;
  top: -32px;
  position: absolute;
`

export const generatingContentContainerStyle = css`
  display: inline-flex;
  pointer-events: auto;
  flex-direction: row;
  align-items: center;
  background: ${getColor("white", "01")};
  box-sizing: border-box;
  border-radius: 16px;
  border: 1px solid ${getColor("grayBlue", "08")};
  padding: 4px 15px;
`
export const generatingTextStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`

export const generatingDividerStyle = css`
  width: 1px;
  height: 12px;
  margin-left: 10px;
  margin-right: 10px;
  background: ${getColor("grayBlue", "08")};
`

export const stopIconStyle = css`
  cursor: pointer;
`

export const mobileInputContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
export const mobileInputStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const operationStyle = (showKnowledge: boolean) => css`
  display: flex;
  justify-content: ${showKnowledge ? "space-between" : "flex-end"};
  align-items: flex-end;
  align-self: stretch;
`

export const sendButtonStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
`
