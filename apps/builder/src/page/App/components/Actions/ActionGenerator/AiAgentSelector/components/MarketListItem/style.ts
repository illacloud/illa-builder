import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const listItemContainerStyle = css`
  display: flex;
  width: 100%;
  padding: 8px 24px;
  align-items: center;
  justify-content: space-between;
`

export const itemDetailAndOtherInfosContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 40px;
  width: 441px;
  justify-content: space-between;
`

export const starAndRunIconContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 3px 0px;
`

export const numberContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1px 0;
`

export const detailContainerStyle = css`
  display: flex;
  gap: 16px;
  max-width: 448px;
`

export const imgStyle = css`
  width: 32px;
  height: 32px;
  border-radius: 5px;
  flex: none;
`

export const titleAndDescContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
`

export const titleStyle = css`
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  color: ${getColor("grayBlue", "02")};
`

export const descStyle = css`
  color: ${getColor("grayBlue", "03")};
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 400px;
  font-size: 12px;
  line-height: 18px;
  min-width: 0;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`

export const teamInfoContainerStyle = css`
  display: flex;
  align-items: center;
  width: 240px;
`

export const teamIconStyle = css`
  width: 16px;
  height: 16px;
  flex: none;
  overflow: hidden;
`

export const teamNameStyle = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  line-height: 20px;
  color: ${getColor("grayBlue", "03")};
`
