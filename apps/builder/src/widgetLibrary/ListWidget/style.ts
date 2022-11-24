import { css } from "@emotion/react"

export const listParentContainerStyle = css`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`

export const ListParentContainerWithScroll = css`
  ${listParentContainerStyle};
  overflow-y: auto;
`

export const listContainerStyle = css`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

export const listItemStyle = css`
  width: 100%;
  height: 48px;
  background-color: blue;
  flex: none;
`

export const paginationWrapperStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
`
