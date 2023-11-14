import { FC, useContext } from "react"
import { createPortal } from "react-dom"
import { Modal } from "@illa-design/react"
import FilesModalContent from "./components/FileListContent"
import { DriveFileSelectContext } from "./context"

const FilesModal: FC = () => {
  const { modalVisible, handleCloseModal } = useContext(DriveFileSelectContext)

  return createPortal(
    <>
      {modalVisible && (
        <Modal
          closable
          maskClosable
          withoutPadding
          visible
          onCancel={handleCloseModal}
          footer={false}
        >
          <FilesModalContent />
        </Modal>
      )}
    </>,
    document.body,
  )
}

export default FilesModal
export { usePath } from "./hooks/usePath"
export * from "./utils"
export * from "./interface"
export * from "./context"
export * from "./constants"
