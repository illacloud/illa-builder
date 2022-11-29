import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const optionListHeaderStyle = css`
  width: 100%;
  background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  font-weight: 500;
  box-sizing: border-box;
  padding: 0 16px;
`

export const listStyle = css`
  border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  margin: 0 16px 0 16px;
  border-radius: 8px;
`

export const listWrapperStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 12px 0;
`
