import { FC, useContext } from "react"
import Folder from "@/assets/drive/panelFolder.svg?react"
import { DriveFileSelectContext } from "@/components/DriveFileSelect"
import { PanelLabel } from "@/page/App/components/InspectPanel/components/Label"
import {
  fileSelectContainerStyle,
  folderIconStyle,
  sourceHeaderContainerStyle,
} from "./style"

interface SourceHeaderProps {
  labelName?: string
  labelDesc?: string
  showSelect: boolean
}
const SourceHeader: FC<SourceHeaderProps> = ({
  labelName,
  labelDesc,
  showSelect,
}) => {
  const { setModalVisible } = useContext(DriveFileSelectContext)
  return (
    <div css={sourceHeaderContainerStyle}>
      <PanelLabel
        labelName={labelName}
        labelDesc={labelDesc}
        labelSize="medium"
      />
      {showSelect && (
        <div
          css={fileSelectContainerStyle}
          onClick={() => {
            setModalVisible(true)
          }}
        >
          <span css={folderIconStyle}>
            <Folder />
          </span>
          <span>ILLA Drive</span>
        </div>
      )}
    </div>
  )
}

export default SourceHeader
