import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import {
  FOLDER_LIST_CONTAINER_HEIGHT,
  FOLDER_LIST_ITEM_HEIGHT,
} from "./constants"

export const headerContainerStyle = css`
  display: flex;
  gap: 16px;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const listItemContainerStyle = css`
  display: flex;
  align-items: center;
  height: ${FOLDER_LIST_ITEM_HEIGHT}px;
  gap: 8px;
  cursor: pointer;
  & > input {
    margin: 3px 4px;
  }
`

export const emptyContainerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const fileListContainerStyle = css`
  height: ${FOLDER_LIST_CONTAINER_HEIGHT}px;
  width: 100%;
  position: relative;
`

export const applyInnerFileListContainerStyle = (isLoading: boolean) => {
  const loadingStyle = css`
    opacity: 0.5;
    transition: opacity 0.3s;
    user-select: none;
    pointer-events: none;
  `
  return css`
    height: 100%;
    width: 100%;
    ${isLoading && loadingStyle};
  `
}

export const loadingContainerStyle = css`
  height: ${FOLDER_LIST_CONTAINER_HEIGHT}px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  z-index: 4;
`

export const footerContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 24px 0 16px;
  gap: 8px;
`

export const fileNameStyle = css`
  font-size: 14px;
  color: ${getColor("grayBlue", "02")};
  font-weight: 500;
`

// ---
export const iconPublicStyle = css`
  display: inline-block;
  width: 24px;
  height: 30px;
  flex: none;
`

export const ModalTitleStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 8px 8px;
  & > span:first-of-type {
    font-weight: 600;
    font-size: 24px;
  }
`
