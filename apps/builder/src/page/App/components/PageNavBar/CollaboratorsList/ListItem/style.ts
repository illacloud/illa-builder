import { css } from "@emotion/react"

export const avatarStyle = css`
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
`

export const getListItemContainerStyle = (type: string = "") => {
  if (type === "list") {
    return css`
      display: flex;
      gap: 8px;
      font-weight: 500;
      font-size: 14px;
      height: 32px;
      &:not(:last-child) {
        margin-bottom: 12px;
      }
    `
  }
  return css`
    display: inline-block;
  `
}

export const nicknameStyle = css`
  line-height: 22px;
  height: 22px;
  align-self: center;
  font-family: "Inter";
  font-size: 14px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
