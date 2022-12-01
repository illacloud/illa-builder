import { SerializedStyles, css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

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

export const settingUserStyle = css`
  padding: 8px 16px;
`

export const usernameStyle = css`
  font-size: 12px;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  margin-left: 8px;
`

export const settingListStyle = css`
  padding: 4px 0;
`

export const settingItemStyle = css`
  padding: 5px 16px;
  font-size: 14px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  cursor: pointer;

  &:hover {
    background: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  }
`

export function applyUserAvatarStyle(background: string): SerializedStyles {
  return css`
    display: inline-block;
    background: #${background};
    color: ${globalColor(`--${illaPrefix}-white-01`)};
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-radius: 50%;
  `
}
