import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const fullWidth = css`
  width: 100%;
`

export const publicButtonWrapperStyle = css`
  margin-top: 40px;
  ${fullWidth};
`

export const settingAccountStyle = css`
  display: flex;
  ${fullWidth};
`

export const avatarStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  margin-top: 24px;
  margin-right: 64px;
  font-size: 30px;
  flex: none;
`

export const editLabelStyle = css`
  margin-right: 64px;
  margin-top: 8px;
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${getColor("grayBlue", "04")};
`
