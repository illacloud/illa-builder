import { FC, useContext } from "react"
import { Modal } from "@illa-design/react"
import { FileUploadContext } from "@/page/App/components/InspectPanel/PanelSetters/DriveSourceGroupSetter/provider/FileUploadProvider"
import MoveFilesModalContent from "./components/UploadFileModalContent"

const UploadFileModal: FC = () => {
  const { uploadModalVisible, setUploadModalVisible } =
    useContext(FileUploadContext)

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <Modal
        visible={uploadModalVisible}
        w="auto"
        footer={false}
        withoutPadding
        onCancel={() => setUploadModalVisible(false)}
      >
        <MoveFilesModalContent />
      </Modal>
    </div>
  )
}

export default UploadFileModal
