import { SerializedStyles, css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const gridFormFieldStyle: SerializedStyles = css`
  display: grid;
  gap: 24px;
  margin-bottom: 40px;
`
export const formTitleStyle: SerializedStyles = css`
  font-weight: 600;
  font-size: 18px;
  line-height: 26px;
  color: ${globalColor(`--${illaPrefix}-gray-02`)};
  margin-bottom: 16px;
`
export const submitButtonStyle: SerializedStyles = css`
  height: 88rem;
  border-radius: 16rem;

  & > span {
    font-size: 32rem;
  }
`

export const errorMsgStyle: SerializedStyles = css`
  position: absolute;
  font-size: 24rem;
  padding-top: 8rem;
  color: ${globalColor(`--${illaPrefix}-orange-03`)};
`

export const mobileInputStyle = css`
  font-size: 28rem;
  height: 96rem;

  & > span {
    padding: 0 32rem;

    & svg {
      font-size: 40rem;
    }
  }
`
