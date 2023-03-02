import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const listParentContainerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`

export const listParentContainerWithPagination = css`
  ${listParentContainerStyle};
  height: 100%;
`

export const ListParentContainerWithScroll = css`
  ${listParentContainerStyle};
  overflow-y: auto;
`

export const listContainerStyle = css`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`

export const applyListItemStyle = (
  isFirst: boolean = false,
  canShowBorder: boolean = false,
  bgColor: string,
  isEditor: boolean = false,
  itemHeight?: number,
) => {
  return css`
    width: 100%;
    height: ${itemHeight ? `${itemHeight}px` : "100%"};
    background-color: ${bgColor || "white"};
    flex: none;
    margin-top: ${!isFirst ? "8px" : 0};
    border: 1px dashed
      ${canShowBorder ? getColor("techPurple", "01") : "transparent"};
    opacity: ${isEditor && !isFirst ? 0.5 : 1};
  `
}

export const paginationWrapperStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
`
