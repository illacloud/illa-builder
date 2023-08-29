import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const teamListItemContainerStyle = css`
  display: flex;
  width: 100%;
  padding: 8px 24px;
  align-items: center;
  justify-content: space-between;
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
  max-height: 36px;
  min-width: 0;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`
