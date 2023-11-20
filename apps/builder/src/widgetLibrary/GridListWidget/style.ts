import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import { COLUMN_NUM_ADAPTATION } from "./interface"

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
  bgColor: string,
  shadowStyle: string,
  borderStyle: string,
  isEditor: boolean = false,
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
    opacity: ${isEditor && !isFirst ? 0.5 : 1};
    ${borderStyle};
    box-shadow: ${shadowStyle};
    ${extraPadding};
  `
}

export const paginationWrapperStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
`

export const itemContainerStyle = (
  columnNumAdaptation: COLUMN_NUM_ADAPTATION,
  itemGapX: number,
  itemGapY: number,
  numberOfColumns?: number,
  minColumnWidth?: number,
) => {
  let gridStyle
  if (columnNumAdaptation === COLUMN_NUM_ADAPTATION.FIXED) {
    gridStyle = css`
      grid-template-columns: repeat(${numberOfColumns ?? 3}, 1fr);
    `
  } else {
    gridStyle = css`
      grid-template-columns: repeat(
        auto-fit,
        minmax(${minColumnWidth ?? 240}px, 1fr)
      );
    `
  }
  return css`
    display: grid;
    height: 100%;
    width: 100%;
    gap: ${itemGapX}px ${itemGapY}px;
    ${gridStyle};
    overflow-y: auto;
    padding: 1px;
  `
}

export const radioButtonOptionItemStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
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
    `
  }
  return css`
    width: 100%;
    height: ${itemHeight ? `${itemHeight}px` : "100%"};
    outline: 1px solid ${themeColor ?? getColor("blue", "01")} !important;
    border-radius: ${radius ?? "unset"};
  `
}
