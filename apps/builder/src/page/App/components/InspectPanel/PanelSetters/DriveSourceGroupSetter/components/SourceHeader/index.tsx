import { useUpgradeModal } from "@illa-public/upgrade-modal"
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
  canUseDrive: boolean
}
const SourceHeader: FC<SourceHeaderProps> = ({
  labelName,
  labelDesc,
  showSelect,
  canUseDrive,
}) => {
  const upgradeModal = useUpgradeModal()
  const { setModalVisible } = useContext(DriveFileSelectContext)
  const handleClickSelect = () => {
    if (canUseDrive) {
      setModalVisible(true)
    } else {
      upgradeModal({
        modalType: "upgrade",
        from: "panel_setter_select",
      })
    }
  }
  return (
    <div css={sourceHeaderContainerStyle}>
      <PanelLabel
        labelName={labelName}
        labelDesc={labelDesc}
        labelSize="medium"
      />
      {showSelect && (
        <div css={fileSelectContainerStyle} onClick={handleClickSelect}>
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
