import { css } from "@emotion/react"
import { getColor, globalColor, illaPrefix } from "@illa-design/react"

export const viewsListWrapperStyle = css`
  display: flex;
  flex-direction: column;
  border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  border-radius: 8px;
  overflow: hidden;
`

export const viewsListHeaderWrapperStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 287px;
  height: 40px;
  padding: 8px 8px 8px 16px;
  background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
`
export const viewsListBodyWrapperStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const headerLabelStyle = css`
  font-size: 14px;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const headerAddIconStyle = css`
  width: 8px;
  height: 8px;
`

export const labelNameAndDragIconWrapperStyle = css`
  display: flex;
  align-items: center;
`

export const selectedIconAndLabelNameWrapperStyle = css`
  display: flex;
  max-width: 191px;
  align-items: center;
  gap: 8px;
`

export const labelNameStyle = css`
  max-width: 147px;
  font-size: 14px;
  font-weight: 400;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const itemWrapperStyle = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 9px 16px;
  gap: 4px;
  height: 40px;
  cursor: pointer;
`

export const modalWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${globalColor(`--${illaPrefix}-white-01`)};
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`

export const modalHeaderWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  width: 360px;
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

export const viewListEmptyBody = css`
  padding: 8px 16px;
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${getColor("grayBlue", "04")};
`
