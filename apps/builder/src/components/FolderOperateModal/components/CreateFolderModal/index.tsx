import { DUPLICATION_HANDLER, GCS_OBJECT_TYPE } from "@illa-public/public-types"
import { FC, useCallback, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { Modal, useMessage } from "@illa-design/react"
import { Input } from "@illa-design/react"
import {
  fetchCheckFileExist,
  fetchGCSUploadPresignedURL,
} from "@/services/drive"
import { FolderOperateModalContext } from "../../context"
import { SameNameModal } from "../SameNameModal"
import { CreateFolderModalProps } from "./interface"
import { invalidTipsStyle, messageStyle } from "./style"

const availableFilenameRule = /^[\u4e00-\u9fa5a-zA-Z0-9=_~\-]+$/u

const isInvalidFolderName = (folderName: string) => {
  return !availableFilenameRule.test(folderName)
}

const CreateFolderModal: FC<CreateFolderModalProps> = ({ currentFolderID }) => {
  const {
    currentFolderPath,
    createFolderVisible,
    setCreateFolderVisible,
    setCurrentFolderPath,
  } = useContext(FolderOperateModalContext)
  const { t } = useTranslation()
  const message = useMessage()
  const [folderName, setFolderName] = useState("")
  const [newFolderName, setNewFolderName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sameModalVisible, setSameModalVisible] = useState(false)

  const isDisabled =
    !!folderName && isInvalidFolderName((folderName ?? "").trim())

  const createFolder = useCallback(
    async (name: string, duplicationHandler = DUPLICATION_HANDLER.RENAME) => {
      try {
        const response = await fetchGCSUploadPresignedURL({
          name: name,
          folderID: currentFolderID,
          type: GCS_OBJECT_TYPE.FOLDER,
          size: 0,
          resumable: false,
          duplicationHandler,
          contentType: "",
        })
        setCreateFolderVisible(false)
        message.success({
          content: t("drive.message.create_suc"),
        })
        setCurrentFolderPath(`${currentFolderPath}/${response.data.name}`)
      } catch (e) {
        message.error({
          content: t("drive.message.create_failed"),
        })
      }
    },
    [
      currentFolderID,
      currentFolderPath,
      message,
      setCreateFolderVisible,
      setCurrentFolderPath,
      t,
    ],
  )

  const handleClickCreate = useCallback(async () => {
    setIsLoading(true)
    try {
      const duplicateResponse = await fetchCheckFileExist([
        {
          folderID: currentFolderID,
          name: folderName,
          type: GCS_OBJECT_TYPE.FOLDER,
        },
      ])
      const duplicateInfo = duplicateResponse.data[0]
      if (duplicateInfo.isDuplicated) {
        setNewFolderName(duplicateInfo.name)
        setSameModalVisible(true)
        return
      }
      await createFolder(folderName.trim())
    } catch (e) {
    } finally {
      setIsLoading(false)
    }
  }, [createFolder, currentFolderID, folderName, setSameModalVisible])

  return (
    <>
      <Modal
        closable
        visible={createFolderVisible}
        okButtonProps={{
          disabled: (folderName ?? "").trim().length <= 0 || isDisabled,
          loading: isLoading,
          colorScheme: "techPurple",
        }}
        enableOnFormTags={[]}
        title={t("drive.create_modal.title.create_a_folder")}
        okText={t("drive.create_modal.title.create")}
        cancelText={t("drive.create_modal.title.cancel")}
        onOk={handleClickCreate}
        onCancel={() => {
          setCreateFolderVisible(false)
        }}
        afterClose={() => {
          setFolderName("")
          setIsLoading(false)
        }}
      >
        <Input
          colorScheme="techPurple"
          onChange={setFolderName}
          value={folderName}
          maxLength={255}
        />
        {isDisabled ? (
          <span css={invalidTipsStyle}>
            {t("drive.create_modal.validate_failed")}
          </span>
        ) : (
          <span css={messageStyle}>{t("drive.create_modal.validate")}</span>
        )}
      </Modal>
      <SameNameModal
        objectName={newFolderName}
        createFolder={createFolder}
        sameModalVisible={sameModalVisible}
        setSameModalVisible={setSameModalVisible}
      />
    </>
  )
}

export default CreateFolderModal
