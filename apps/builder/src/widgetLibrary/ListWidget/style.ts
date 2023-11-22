import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import {
  LIST_ITEM_MARGIN_TOP,
  WIDGET_SCALE_SQUARE_BORDER_WIDTH,
} from "@/page/App/components/ScaleSquare/constant/widget"
import { ShadowOptions } from "./interface"
import { getGapByShadow } from "./utils"

export const listParentContainerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  gap: 8px;
  justify-content: space-between;
`

export const listParentContainerWithPagination = css`
  ${listParentContainerStyle};
  overflow-y: auto;
`

export const ListParentContainerWithScroll = css`
  ${listParentContainerStyle};
  overflow-y: auto;
`

export const applyListItemStyle = (
  isFirst: boolean = false,
  canShowBorder: boolean = false,
  bgColor: string,
  shadowStyle: string,
  borderStyle: string,
  isEditor: boolean = false,
  loading?: boolean,
  itemHeight?: number,
) => {
  let extraPadding = isFirst
    ? ""
    : css`
        padding: 5px;
      `
  return css`
    width: 100%;
    height: ${itemHeight ? `${itemHeight}px` : "100%"};
    background-color: ${bgColor || "white"};
    flex: none;
    border: ${WIDGET_SCALE_SQUARE_BORDER_WIDTH}px dashed
      ${canShowBorder ? getColor("techPurple", "01") : "transparent"};
    opacity: ${isEditor && !isFirst ? 0.5 : 1};
    ${borderStyle};
    box-shadow: ${shadowStyle};
    ${extraPadding};
    pointer-events: ${loading ? "none" : "unset"};
  `
}

export const paginationWrapperStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
`

export const itemContainerStyle = (
  itemGap?: number,
  shadow?: ShadowOptions,
) => css`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: ${itemGap ?? LIST_ITEM_MARGIN_TOP}px;
  overflow-y: auto;
  padding: ${getGapByShadow(shadow)}px;
`

export const selectStyle = (
  isSelect: boolean,
  isEditMode: boolean,
  themeColor?: string,
  radius?: string,
  itemHeight?: number,
) => {
  if (isEditMode || !isSelect) {
    return css`
      width: 100%;
      height: ${itemHeight ? `${itemHeight}px` : "100%"};
    `
  }
  return css`
    width: 100%;
    height: ${itemHeight ? `${itemHeight}px` : "100%"};
    outline: 1px solid ${themeColor ?? getColor("blue", "01")} !important;
    border-radius: ${radius ?? "unset"};
  `
}
