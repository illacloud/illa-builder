import { FC, ReactNode, createContext, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  FolderOperateModalContext,
  ROOT_PATH,
} from "@/components/FolderOperateModal"
import UploadOperate from "../../components/UploadOperate"

interface Injected {
  uploadName: string
  widgetType: string
  isUpLoading: boolean
  setIsUpLoading: (v: boolean) => void
  setUploadName: (name: string) => void
  handleUpdateResult: (value: string) => void
}

interface FileUploadProviderProps {
  widgetType: string
  handleUpdateResult: (value: string) => void
  children: ReactNode
}

export const FileUploadContext = createContext<Injected>({} as Injected)

export const FileUploadProvider: FC<FileUploadProviderProps> = ({
  children,
  widgetType,
  handleUpdateResult,
}) => {
  const [currentFolderPath, setCurrentFolderPath] = useState(ROOT_PATH)
  const [folderOperateVisible, setFolderOperateVisible] = useState(false)
  const [createFolderVisible, setCreateFolderVisible] = useState(false)
  const [isUpLoading, setIsUpLoading] = useState(false)
  const [uploadName, setUploadName] = useState("")
  const { t } = useTranslation()

  return (
    <FileUploadContext.Provider
      value={{
        widgetType,
        handleUpdateResult,
        isUpLoading,
        uploadName,
        setIsUpLoading,
        setUploadName,
      }}
    >
      <FolderOperateModalContext.Provider
        value={{
          subTitle: t("drive.upload.modal.upload_to"),
          currentFolderPath,
          folderOperateVisible,
          createFolderVisible,
          setCreateFolderVisible,
          setCurrentFolderPath,
          setFolderOperateVisible,
          operateChildren: <UploadOperate />,
        }}
      >
        {children}
      </FolderOperateModalContext.Provider>
    </FileUploadContext.Provider>
  )
}
