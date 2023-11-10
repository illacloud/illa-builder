import { FC, ReactNode, createContext, useState } from "react"
import { ROOT_PATH } from "@/page/App/components/InspectPanel/PanelSetters/DriveSourceGroupSetter/constants"

interface Injected {
  currentFolderPath: string
  uploadModalVisible: boolean
  createFolderVisible: boolean
  uploadName: string
  widgetType: string
  isUpLoading: boolean
  setIsUpLoading: (v: boolean) => void
  setCurrentFolderPath: (path: string) => void
  setUploadModalVisible: (v: boolean) => void
  setCreateFolderVisible: (v: boolean) => void
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
  const [uploadModalVisible, setUploadModalVisible] = useState(false)
  const [createFolderVisible, setCreateFolderVisible] = useState(false)
  const [isUpLoading, setIsUpLoading] = useState(false)
  const [uploadName, setUploadName] = useState("")

  return (
    <FileUploadContext.Provider
      value={{
        widgetType,
        uploadName,
        currentFolderPath,
        uploadModalVisible,
        createFolderVisible,
        isUpLoading,
        setIsUpLoading,
        setUploadName,
        setCreateFolderVisible,
        setCurrentFolderPath,
        setUploadModalVisible,
        handleUpdateResult,
      }}
    >
      {children}
    </FileUploadContext.Provider>
  )
}
