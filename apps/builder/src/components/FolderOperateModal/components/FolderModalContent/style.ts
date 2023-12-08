import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import { FOLDER_LIST_CONTAINER_HEIGHT } from "../../constants"

export const containerStyle = css`
  padding: 24px;
`

export const contentHeaderStyle = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
  & > span {
    font-size: 16px;
    font-weight: 600;
    line-height: 32px;
  }
`

export const applyInnerFolderListContainerStyle = (isLoading: boolean) => {
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

export const breadcrumbContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
`

export const folderListContainerStyle = css`
  height: ${FOLDER_LIST_CONTAINER_HEIGHT}px;
  width: 100%;
  position: relative;
  color: ${getColor("grayBlue", "02")};
`

export const footerContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 24px;
`

export const footerOperationsContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const newFolderButtonStyle = css`
  color: ${getColor("grayBlue", "02")};
  padding: 5px 8px !important;
`

export const spanBreadcrumbStyle = css`
  font-size: 14px;
  font-weight: 500;
`

export const closeStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  cursor: pointer;
`

export const breadItemStyle = (isLast: boolean) => css`
  color: ${isLast ? getColor("techPurple", "03") : getColor("gray", "04")};
`
