import { IILLAFileInfo } from "@/services/drive"

export interface FolderListProps {
  listData: IILLAFileInfo[]
  updateListData: (page: number, path: string) => void
}
