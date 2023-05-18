import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const errorBodyStyle = css`
  margin: 120px auto;
  text-align: center;
`

export const errorIconContentStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin: 0 auto;
  background: ${getColor("red", "07")};
`

export const errorIconColorStyle = css`
  color: ${getColor("red", "03")};
`

export const errorTitleStyle = css`
  font-size: 14px;
  margin-top: 16px;
  color: ${getColor("grayBlue", "02")};
  font-weight: 600;
`

export const errorDescriptionStyle = css`
  font-size: 14px;
  color: ${getColor("grayBlue", "04")};
  margin-bottom: 24px;
`
