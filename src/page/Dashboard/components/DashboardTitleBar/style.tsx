import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const containerStyle: SerializedStyles = css`
  box-sizing: border-box;
  width: 100%;
  & > div {
    height: 48px;
  }
`

export const navBarLogoContainerStyle: SerializedStyles = css`
  padding-left: 16px;
  padding-right: 24px;
  display: inline-flex;
  align-items: center;
  align-self: center;
  flex-direction: row;
  width: 74px;
`

export const navBarAvatarContainerStyle: SerializedStyles = css`
  padding-left: 16px;
  padding-right: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: end;
  flex-grow: 1;
  align-self: center;
  flex-direction: row;
  cursor: pointer;
`

export const expandStyle: SerializedStyles = css`
  margin-left: 8px;
`

export const settingBodyStyle = css`
  width: 200px;
  height: 120px;
  border-radius: 8px;
  border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
`

export const coverTriggerStyle = css`
  position: relative;
  top: 10px;
  & > div {
    padding: 0;
    box-shadow: none;
  }
`

export const settingUserStyle = css`
  padding: 0 8px;
`

export const userAvatarStyle = css`
  margin: 8px;
`

export const usernameStyle = css`
  font-size: 12px;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const settingListStyle = css`
  padding: 4px 0;
`

export const settingItemStyle = css`
  padding: 5px 16px;
  font-size: 14px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  cursor: pointer;
  &: hover {
    background: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  }
`
