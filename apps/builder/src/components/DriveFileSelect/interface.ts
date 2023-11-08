import { IILLAFileInfo } from "@/services/drive"

export type FileToPanel = Pick<
  IILLAFileInfo,
  "id" | "lastModifiedAt" | "name" | "size" | "type"
>
