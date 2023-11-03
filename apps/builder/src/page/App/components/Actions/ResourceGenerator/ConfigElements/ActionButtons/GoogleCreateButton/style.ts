import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

const googleButtonStyle = css`
  display: flex;
  font-family: Helvetica Neue;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  align-items: center;
  border: none;
  border-radius: 2px !important;
`

export const googleSheetsButtonStyle = css`
  ${googleButtonStyle};
  padding: 1px 16px 1px 1px;
  gap: 8px;
  box-shadow:
    0px 1px 1px 0px rgba(0, 0, 0, 0.24),
    0px 0px 1px 0px rgba(0, 0, 0, 0.12);
  background-color: rgba(66, 133, 244, 1);
  color: ${getColor("white", "01")};
  font-family: Helvetica Neue;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  cursor: pointer;
  &:hover {
    background-color: rgba(51, 103, 214, 1);
  }
  &:disabled {
    color: rgba(0, 0, 0, 0.4);
    cursor: not-allowed;
    background-color: rgba(0, 0, 0, 0.09);
    box-shadow: none;
  }
`

export const googleIconStyle = css`
  width: 38px;
  height: 38px;
`

export const oAuthSubmitButtonStyle = css`
  ${googleButtonStyle};
  height: 40px !important;
`
