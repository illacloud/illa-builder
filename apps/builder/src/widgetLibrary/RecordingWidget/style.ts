import { css } from "@emotion/react"

export const applyPreviewStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  height: 100%;
  width: 100%;
`

export const audioContainerStyle = css`
  width: 100%;
  height: 45px;
`

export const applyContainerStyle = css`
  flex-direction: row;
  align-items: center;
  gap: 15px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
`

export const applyTextButtonStyle = css`
  &:hover,
  &:active {
    background-color: transparent !important;
  }
`
