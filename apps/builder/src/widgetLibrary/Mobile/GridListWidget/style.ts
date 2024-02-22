import { css } from "@emotion/react"
import { getColor, getSpecialThemeColor } from "@illa-design/react"
import { SCROLL_CONTAINER_PADDING } from "@/page/App/components/DotPanel/constant/canvas"
import { getPaddingShape } from "@/utils/styleUtils/padding"
import { COLUMN_NUM_ADAPTATION, ShadowOptions } from "./interface"
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
  bgColor: string,
  shadowStyle: string,
  borderStyle: string,
  isEditor: boolean = false,
  loading?: boolean,
  itemHeight?: number,
  padding?: string,
) => {
  // canvas container hash scroll container padding
  let extraPadding = isFirst ? 0 : SCROLL_CONTAINER_PADDING
  const { paddingTop, paddingBottom, paddingLeft, paddingRight } =
    getPaddingShape(padding)
  return css`
    width: 100%;
    height: ${itemHeight ? `${itemHeight}px` : "100%"};
    background-color: ${bgColor
      ? getSpecialThemeColor(bgColor)
      : "transparent"};
    flex: none;
    opacity: ${isEditor && !isFirst ? 0.5 : 1};
    ${borderStyle};
    box-shadow: ${shadowStyle};
    padding: ${paddingTop + extraPadding}px ${paddingRight + extraPadding}px
      ${paddingBottom + extraPadding}px ${paddingLeft + extraPadding}px;
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
  columnNumAdaptation: COLUMN_NUM_ADAPTATION,
  itemGapX: number,
  itemGapY: number,
  shadow?: ShadowOptions,
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
  let paddingStyle = getGapByShadow(shadow)
  return css`
    display: grid;
    width: 100%;
    gap: ${itemGapX}px ${itemGapY}px;
    ${gridStyle};
    overflow-y: auto;
    padding: ${paddingStyle}px;
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
      height: ${itemHeight ? `${itemHeight}px` : "100%"};
    `
  }
  return css`
    width: 100%;
    height: ${itemHeight ? `${itemHeight}px` : "100%"};
    outline: 1px solid ${themeColor ?? getColor("blue", "03")} !important;
    border-radius: ${radius ?? "unset"};
  `
}
