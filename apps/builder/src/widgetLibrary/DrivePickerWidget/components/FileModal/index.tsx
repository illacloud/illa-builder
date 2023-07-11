import { FC, useContext } from "react"
import { createPortal } from "react-dom"
import { useTranslation } from "react-i18next"
import { CloseIcon, Modal } from "@illa-design/react"
import { DrivePickerContext } from "@/widgetLibrary/DrivePickerWidget/context"
import { FilesModalContent } from "./content"
import { ModalStyle } from "./style"

export const FilesModal: FC = () => {
  const { t } = useTranslation()
  const { modalVisible, setModalVisible } = useContext(DrivePickerContext)

  return createPortal(
    <>
      {modalVisible && (
        <Modal
          closable
          maskClosable
          visible
          title={t("widget.drive_picker.modal.files")}
          closeElement={
            <span
              onClick={() => setModalVisible(false)}
              style={{ cursor: "pointer" }}
            >
              <CloseIcon />
            </span>
          }
          _css={ModalStyle}
          onCancel={() => setModalVisible(false)}
          footer={false}
        >
          <FilesModalContent />
        </Modal>
      )}
    </>,
    document.body,
  )
}
