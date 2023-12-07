import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import { FOLDER_LIST_ITEM_HEIGHT } from "../../constants"

export const fileNameStyle = css`
  font-size: 14px;
  color: ${getColor("grayBlue", "02")};
  font-weight: 500;
`
export const iconPublicStyle = css`
  display: inline-block;
  width: 24px;
  height: 30px;
  flex: none;
`

export const listItemContainerStyle = css`
  display: flex;
  align-items: center;
  padding: 0 24px;
  height: ${FOLDER_LIST_ITEM_HEIGHT}px;
  gap: 8px;
  cursor: pointer;
  & > input {
    margin: 3px 4px;
  }
`

export const singleListItemContainerStyle = (isSelected: boolean) => css`
  ${listItemContainerStyle};
  background-color: ${isSelected
    ? getColor("techPurple", "08")
    : "transparent"};
`

export const doubtStyle = css`
  display: flex;
  width: 16px;
  height: 16px;
`
