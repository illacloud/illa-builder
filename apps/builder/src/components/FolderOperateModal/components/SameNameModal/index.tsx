import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Modal } from "@illa-design/react"
import SameNameModalContent from "./content"
import { SameNameModalProps } from "./interface"

export const SameNameModal: FC<SameNameModalProps> = (props) => {
  const { objectName, sameModalVisible, setSameModalVisible, createFolder } =
    props

  const { t } = useTranslation()
  const onCancel = () => {
    setSameModalVisible(false)
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <Modal
        closable
        visible={sameModalVisible}
        onCancel={onCancel}
        title={t("drive.same_name_modal.this_folder_already")}
        footer={false}
      >
        <SameNameModalContent
          objectName={objectName}
          createFolder={createFolder}
          onCancel={onCancel}
        />
      </Modal>
    </div>
  )
}
