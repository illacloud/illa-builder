import { css } from "@emotion/react"
import { FOLDER_LIST_CONTAINER_HEIGHT } from "../../constants"

export const ModalTitleStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 32px 8px;
  & > span:first-of-type {
    font-weight: 600;
    font-size: 24px;
  }
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

export const fileListContainerStyle = css`
  height: ${FOLDER_LIST_CONTAINER_HEIGHT}px;
  width: 100%;
  position: relative;
`

export const footerContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 24px 24px 16px 24px;
  gap: 8px;
`

export const headerContainerStyle = css`
  display: flex;
  gap: 16px;
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
