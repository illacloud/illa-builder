import { FC, useContext } from "react"
import { Modal } from "@illa-design/react"
import FolderModalContent from "./components/FolderModalContent"
import { FolderOperateModalContext } from "./context"

const FolderOperateModal: FC = () => {
  const { folderOperateVisible, setFolderOperateVisible } = useContext(
    FolderOperateModalContext,
  )

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <Modal
        visible={folderOperateVisible}
        w="auto"
        footer={false}
        withoutPadding
        onCancel={() => setFolderOperateVisible(false)}
      >
        <FolderModalContent />
      </Modal>
    </div>
  )
}

export default FolderOperateModal
export * from "./constants"
export * from "./context"
