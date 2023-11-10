import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import { PROCESS_DETAIL_LIST_HEIGHT } from "./constants"
import { FILE_ITEM_DETAIL_STATUS_IN_UI } from "./interface"

export const fileListContainerStyle = css`
  padding: 0;
`

// Item Style
export const fileItemDetailOuterContainerStyle = css`
  height: 52px;
  display: flex;
  justify-content: space-between;
`

export const fileItemDetailInnerContainerStyle = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: 36px;
`

export const iconAndNameContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const nameAndProcessContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${getColor("grayBlue", "09")};
  border-radius: 2px;
  width: 100%;
  padding: 0 12px;
  height: 36px;
`

export const fileTypeIconStyle = css`
  width: 16px;
  height: 20px;
`

export const fileNameStyle = (status: FILE_ITEM_DETAIL_STATUS_IN_UI) => css`
  color: ${status === FILE_ITEM_DETAIL_STATUS_IN_UI.ERROR
    ? getColor("red", "03")
    : getColor("grayBlue", "02")};
  display: inline-block;
  max-width: 364px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const processContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const iconHotSpotStyle = css`
  width: 16px;
  height: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
`

// empty style
export const emptyStateStyle = css`
  display: flex;
  width: 100%;
  height: ${PROCESS_DETAIL_LIST_HEIGHT}px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
