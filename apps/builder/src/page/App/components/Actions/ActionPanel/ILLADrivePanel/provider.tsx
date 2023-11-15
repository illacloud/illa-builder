import { FC, ReactNode, createContext, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  FolderOperateModalContext,
  ROOT_PATH,
} from "@/components/FolderOperateModal"
import PathOperate from "./components/PathOperate"

interface Injected {
  handleOptionsValueChange: (name: string, value: string) => void
}

interface FileUploadProviderProps {
  children: ReactNode
  handleOptionsValueChange: (name: string, value: string) => void
}

export const PathSelectContext = createContext<Injected>({} as Injected)

export const PathSelectProvider: FC<FileUploadProviderProps> = ({
  children,
  handleOptionsValueChange,
}) => {
  const { t } = useTranslation()
  const [currentFolderPath, setCurrentFolderPath] = useState(ROOT_PATH)
  const [folderOperateVisible, setFolderOperateVisible] = useState(false)
  const [createFolderVisible, setCreateFolderVisible] = useState(false)

  return (
    <PathSelectContext.Provider
      value={{
        handleOptionsValueChange,
      }}
    >
      <FolderOperateModalContext.Provider
        value={{
          subTitle: t("drive.upload.modal.select_folder"),
          currentFolderPath,
          folderOperateVisible,
          createFolderVisible,
          setCreateFolderVisible,
          setCurrentFolderPath,
          setFolderOperateVisible,
          operateChildren: <PathOperate />,
        }}
      >
        {children}
      </FolderOperateModalContext.Provider>
    </PathSelectContext.Provider>
  )
}
