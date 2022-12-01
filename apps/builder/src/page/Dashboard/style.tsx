import { SerializedStyles, css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const containerStyle: SerializedStyles = css`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`

export const loadingStyle = css`
  margin: 248px auto;
`

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
  background: ${globalColor(`--${illaPrefix}-red-07`)};
`

export const errorIconColorStyle = css`
  color: ${globalColor(`--${illaPrefix}-red-03`)};
`

export const errorTitleStyle = css`
  font-size: 14px;
  margin-top: 16px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  font-weight: 600;
`

export const errorDescriptionStyle = css`
  font-size: 14px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  margin-bottom: 24px;
`
