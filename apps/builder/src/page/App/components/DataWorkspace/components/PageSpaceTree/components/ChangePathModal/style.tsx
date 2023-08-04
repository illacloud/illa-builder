import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const modalWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${globalColor(`--${illaPrefix}-white-01`)};
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  padding-bottom: 8px;
`

export const modalHeaderWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  width: 240px;
`

export const modalHeaderCloseIconHotSpot = css`
  width: 24px;
  height: 24px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  cursor: pointer;
`

export const titleStyle = css`
  font-weight: 500;
  font-size: 16px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
`
