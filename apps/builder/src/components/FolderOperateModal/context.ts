import { ReactNode, createContext } from "react"

interface Injected {
  title?: string
  subTitle: string
  currentFolderPath: string
  folderOperateVisible: boolean
  createFolderVisible: boolean
  operateChildren: ReactNode
  setCurrentFolderPath: (path: string) => void
  setFolderOperateVisible: (v: boolean) => void
  setCreateFolderVisible: (v: boolean) => void
}

export const FolderOperateModalContext = createContext<Injected>({} as Injected)
