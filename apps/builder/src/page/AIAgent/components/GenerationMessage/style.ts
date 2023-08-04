import { css } from "@emotion/react"

export const generationContainerStyle = css`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: start;
  margin: 72px;
  padding-left: 24px;
  padding-right: 24px;
  border-radius: 8px;
  border: 1px solid #f2f3f5;
  background: getColor("white", "01");
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);
`

export const avatarStyle = css`
  width: 48px;
  height: 48px;
`

export const nickNameStyle = css`
  color: getColor("grayBlue", "100");
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`
