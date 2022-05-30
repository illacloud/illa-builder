import { css, SerializedStyles } from "@emotion/react"

export const containerStyle: SerializedStyles = css`
  box-sizing: border-box;
  width: 100%;
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
`

export const expandStyle: SerializedStyles = css`
  margin-left: 8px;
`
