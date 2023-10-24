import { SerializedStyles, css } from "@emotion/react"
import { getColor, globalColor, illaPrefix } from "@illa-design/react"

export const tipTextStyle: SerializedStyles = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
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

export const avatarContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const cameraIconContainerStyle = css`
  border-radius: 50%;
  padding: 4px;
  background-color: ${getColor("grayBlue", "09")};
  font-size: 16px;
  position: absolute;
  bottom: 0;
  right: 0;
`

export const containerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 48px;
`

export const formLabelStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
`

export const controllerContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 32rem;
`

export const formContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 64rem;
`
