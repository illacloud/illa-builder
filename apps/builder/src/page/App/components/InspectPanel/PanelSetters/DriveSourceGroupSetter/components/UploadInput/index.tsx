import { useUpgradeModal } from "@illa-public/upgrade-modal"
import { FC, useContext } from "react"
import { FolderOperateModalContext } from "@/components/FolderOperateModal/context"
import { FileUploadContext } from "@/page/App/components/InspectPanel/PanelSetters/DriveSourceGroupSetter/provider/FileUploadProvider"
import { getUploadModeInfo } from "@/page/App/components/InspectPanel/PanelSetters/DriveSourceGroupSetter/utils"
import { uploadContainerStyle, uploadIconStyle, uploadNameStyle } from "./style"

interface UploadModeProps {
  widgetType: string
  canUseDrive: boolean
}
const UploadMode: FC<UploadModeProps> = ({ widgetType, canUseDrive }) => {
  const placeholderInfo = getUploadModeInfo(widgetType)
  const upgradeModal = useUpgradeModal()
  const { uploadName, isUpLoading } = useContext(FileUploadContext)
  const { setFolderOperateVisible } = useContext(FolderOperateModalContext)
  const handleClickUpload = () => {
    if (canUseDrive) {
      setFolderOperateVisible(true)
    } else {
      upgradeModal({
        modalType: "upgrade",
        from: "panel_setter_upload",
      })
    }
  }

  return (
    <div css={uploadContainerStyle(isUpLoading)} onClick={handleClickUpload}>
      <span css={uploadIconStyle}>{placeholderInfo?.icon}</span>
      <span css={uploadNameStyle}>{uploadName || placeholderInfo?.name}</span>
    </div>
  )
}

export default UploadMode
