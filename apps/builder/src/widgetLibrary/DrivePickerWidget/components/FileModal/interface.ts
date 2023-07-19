import { MutableRefObject } from "react"
import { GCS_OBJECT_TYPE, IILLAFileInfo } from "@/services/drive"

interface ObjectInfo {
  name: string
  id: string
  type: GCS_OBJECT_TYPE
}

export interface FilesModalProps {
  objectInfos: ObjectInfo[]
  open: boolean
  currentPath: string
  changeOpen: (open: boolean) => void
}

export interface FileListProps {
  listData: IILLAFileInfo[]
  totalPath: string
  search?: MutableRefObject<string>
  selectItems: FileToPanel[]
  colorScheme: string
  getFileList: (currentPage: number, totalPath: string, search?: string) => void
  updatePath: (changedPath: string) => void
  onChange: (flag: boolean, item: FileToPanel) => void
}

export interface FilesModalContentProps {
  updateListPage: (page: number) => void
  changeOpen: (open: boolean) => void
  currentPath: string
  fileList: IILLAFileInfo[]
  isFileListLoading: boolean
}

export type FileToPanel = Pick<
  IILLAFileInfo,
  "id" | "lastModifiedAt" | "name" | "size" | "type"
>
