import { FC, useContext } from "react"
import { createPortal } from "react-dom"
import { Modal } from "@illa-design/react"
import { DrivePickerContext } from "@/widgetLibrary/DrivePickerWidget/context"
import { FilesModalContent } from "./content"

export const FilesModal: FC = () => {
  const { modalVisible, handleCloseModal } = useContext(DrivePickerContext)

  return createPortal(
    <>
      {modalVisible && (
        <Modal
          closable
          maskClosable
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
