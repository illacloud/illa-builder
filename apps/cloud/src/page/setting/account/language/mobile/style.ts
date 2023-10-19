import { css } from "@emotion/react"

export const mobileSelectStyle = css`
  & input {
    font-size: 28rem;
  }

  & > span {
    font-size: 28rem;
    height: 96rem;
    & > div {
      padding: 0 32rem;
    }
    & svg {
      font-size: 28rem;
    }
  }
`

export const mobileContainerStyle = css`
  display: grid;
  gap: 64rem;
  padding-bottom: 40px;
`

export const submitButtonStyle = css`
  height: 88rem;
  border-radius: 16rem;

  & > span {
    font-size: 32rem;
  }
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
