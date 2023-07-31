import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const blockInputContainerStyle = css`
  position: absolute;
  height: 100%;
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

export const previewTitleTextStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 18px;
  flex: 1;
  font-weight: 500;
  line-height: 24px;
`

export const inputTextContainerStyle = css`
  padding: 24px;
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${getColor("grayBlue", "08")};
`

export const chatContainerStyle = css`
  flex-grow: 1;
  overflow-y: auto;
`

export const inputStyle = css`
  padding: 5px 16px;
  font-size: inherit;
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
