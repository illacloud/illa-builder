import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"
import SignInBgUrl from "@/assets/sign-bg.svg"

export const containerStyle: SerializedStyles = css`
  display: flex;
  width: 100vw;
  height: 100vh;
`

export const asideStyle: SerializedStyles = css`
  width: 520px;
  position: relative;
  padding: 0 40px;
  background: url(${SignInBgUrl})
    ${globalColor(`--${illaPrefix}-techPurple-01`)} no-repeat;
`

export const logoStyle: SerializedStyles = css`
  position: absolute;
  top: 40px;
  left: 24px;
`

export const introductionStyle: SerializedStyles = css`
  font-size: 34px;
  margin-top: 37.5vh;
  font-weight: 500;
  height: 40px;
  color: ${globalColor(`--${illaPrefix}-white-01`)};
`

export const contentStyle: SerializedStyles = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 40px;
`

export const gridFormStyle: SerializedStyles = css`
  display: grid;
  gap: 40px;
  width: 400px;
`

export const gridFormFieldStyle: SerializedStyles = css`
  display: grid;
  gap: 24px;
`

export const gridItemStyle: SerializedStyles = css`
  display: grid;
  gap: 8px;
`

export const gridValidStyle: SerializedStyles = css`
  display: grid;
  gap: 4px;
`

export const formTitleStyle: SerializedStyles = css`
  font-size: 24px;
  line-height: 32px;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-gray-02`)};
`

export const formLabelStyle: SerializedStyles = css`
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const forgotPwdStyle: SerializedStyles = css`
  font-size: 12px;
  line-height: 20px;
  margin-right: 8px;
`

export const forgotPwdContainerStyle: SerializedStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const descriptionStyle: SerializedStyles = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`

export const checkboxTextStyle: SerializedStyles = css`
  font-size: 12px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`

export const errorMsgStyle: SerializedStyles = css`
  position: relative;
  font-size: 14px;
  padding-left: 24px;
  line-height: 22px;
  color: ${globalColor(`--${illaPrefix}-orange-03`)};
`

export const errorIconStyle: SerializedStyles = css`
  position: absolute;
  font-size: 16px;
  line-height: 0;
  top: 3px;
  left: 0;
`
