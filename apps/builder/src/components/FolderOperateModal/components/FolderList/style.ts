import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import { FOLDER_LIST_ITEM_HEIGHT } from "../../constants"

export const listItemContainerStyle = css`
  display: flex;
  align-items: center;
  height: ${FOLDER_LIST_ITEM_HEIGHT}px;
  gap: 4px;
  cursor: pointer;
`

export const folderIconStyle = css`
  width: 24px;
  height: 24px;
`

export const folderNameStyle = css`
  font-size: 14px;
  color: ${getColor("grayBlue", "02")};
  font-weight: 500;
`

export const doubtStyle = css`
  display: flex;
  width: 16px;
  height: 16px;
`
