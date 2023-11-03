import { css } from "@emotion/react"
import { FOLDER_LIST_CONTAINER_HEIGHT } from "@/page/App/components/InspectPanel/PanelSetters/DriveSourceGroupSetter/components/UploadFileModal/constants"

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
