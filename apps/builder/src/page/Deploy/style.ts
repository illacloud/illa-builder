import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const deployContainerStyle = css`
  width: 100%;
  height: 100vh;
`

export const deployLogoStyle = css`
  position: absolute;
  bottom: 16px;
  right: 16px;
  box-shadow: 0 0 8px 0 ${globalColor(`--${illaPrefix}-blackAlpha-07`)};
  border: solid 1px ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  border-radius: 8px;
  font-size: 12px;
  padding: 0 12px;
  height: 40px;
  display: flex;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  background-color: ${globalColor(`--${illaPrefix}-white-01`)};
`
export const logoStyle = css`
  width: 25px;
  height: 12px;
  margin-left: 8px;
`

export const loadingStyle = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
`
