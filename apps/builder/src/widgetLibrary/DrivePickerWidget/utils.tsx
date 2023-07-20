import { SerializedStyles } from "@emotion/react"
import { ReactNode } from "react"
import {
  FileDefaultIcon,
  FileExcelIcon,
  FileMusicIcon,
  FilePPTIcon,
  FilePdfIcon,
  FilePictureIcon,
  FileVideoIcon,
  FileWordIcon,
} from "@illa-design/react"
import { ReactComponent as AnonymousIcon } from "@/assets/drive/anonymous.svg"
import { ReactComponent as FolderIcon } from "@/assets/drive/folder.svg"
import { ReactComponent as ZipIcon } from "@/assets/drive/zip.svg"
import { GCS_OBJECT_TYPE } from "@/services/drive"

export const getCurrentPath = (limitPath: string, totalPath?: string) => {
  const curTotalPath = totalPath ?? limitPath
  const limitPathArr = limitPath.split("/")
  const limitRoot = limitPathArr[limitPathArr.length - 1]
  return removeSuffixPath(`${limitRoot}${curTotalPath.replace(limitPath, "")}`)
}

export const removeSuffixPath = (path: string): string => {
  const regex = /^\/?(.*?)\/?$/
  return path?.match(regex)?.[1] || path
}

const IMAGE_FILE_TYPE_RULES = ["image/"]
const EXCEL_FILE_TYPE_RULES = [
  "application/vnd.sealed.xls",
  "application/vnd.sealed.csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]
const WORD_FILE_TYPE_RULES = [
  "application/vnd.sealed.doc",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]

const AUDIO_FILE_TYPE_RULES = ["audio/"]

const VIDEO_FILE_TYPE_RULES = ["video/", "application/ogg"]

const PDF_FILE_TYPE_RULES = ["application/pdf"]

const PPT_FILE_TYPE_RULES = [
  "application/vnd.sealed.ppt",
  "application/vnd.ms-powerpoint",
  "pplication/vnd.openxmlformats-officedocument.presentationml.presentation",
]

const ZIP_FILE_TYPE_RULES = [
  "application/zip",
  "application/x-rar-compressed",
  "application/x-7z-compressed",
  "application/x-tar",
  "application/x-gzip",
  "application/x-bzip2",
  "application/x-bzip",
  "application/x-lzip",
  "application/x-lzma",
  "application/x-lzop",
  "application/x-xz",
  "application/x-compress",
  "application/x-compressed",
]

const matchRules = (rules: string[], contentType: string) => {
  return rules.some((rule) => contentType.startsWith(rule))
}

export enum ILLA_DRIVE_OBJECT_TYPE {
  IMAGE = "image",
  VIDEO = "video",
  AUDIO = "audio",
  PDF = "pdf",
  WORD = "word",
  EXCEL = "excel",
  PPT = "ppt",
  FOLDER = "folder",
  ZIP = "zip",
  ANONYMOUS_FOLDER = "anonymousFolder",
  DEFAULT = "default",
}

export const getFileTypeByContentType = (
  type: GCS_OBJECT_TYPE,
  contentType?: string,
) => {
  if (type === "folder") {
    return ILLA_DRIVE_OBJECT_TYPE.FOLDER
  } else if (type === "anonymousFolder") {
    return ILLA_DRIVE_OBJECT_TYPE.ANONYMOUS_FOLDER
  }
  if (!contentType) {
    return ILLA_DRIVE_OBJECT_TYPE.DEFAULT
  }
  if (matchRules(IMAGE_FILE_TYPE_RULES, contentType)) {
    return ILLA_DRIVE_OBJECT_TYPE.IMAGE
  }
  if (matchRules(VIDEO_FILE_TYPE_RULES, contentType)) {
    return ILLA_DRIVE_OBJECT_TYPE.VIDEO
  }
  if (matchRules(AUDIO_FILE_TYPE_RULES, contentType)) {
    return ILLA_DRIVE_OBJECT_TYPE.AUDIO
  }
  if (matchRules(PDF_FILE_TYPE_RULES, contentType)) {
    return ILLA_DRIVE_OBJECT_TYPE.PDF
  }
  if (matchRules(WORD_FILE_TYPE_RULES, contentType)) {
    return ILLA_DRIVE_OBJECT_TYPE.WORD
  }
  if (matchRules(EXCEL_FILE_TYPE_RULES, contentType)) {
    return ILLA_DRIVE_OBJECT_TYPE.EXCEL
  }
  if (matchRules(PPT_FILE_TYPE_RULES, contentType)) {
    return ILLA_DRIVE_OBJECT_TYPE.PPT
  }
  if (matchRules(ZIP_FILE_TYPE_RULES, contentType)) {
    return ILLA_DRIVE_OBJECT_TYPE.ZIP
  }
  return ILLA_DRIVE_OBJECT_TYPE.DEFAULT
}

export const getFileIconByILLAFileType = (
  type: ILLA_DRIVE_OBJECT_TYPE,
  iconStyle?: SerializedStyles,
) => {
  switch (type) {
    case ILLA_DRIVE_OBJECT_TYPE.IMAGE:
      return <FilePictureIcon css={iconStyle} />
    case ILLA_DRIVE_OBJECT_TYPE.VIDEO:
      return <FileVideoIcon css={iconStyle} />
    case ILLA_DRIVE_OBJECT_TYPE.AUDIO:
      return <FileMusicIcon css={iconStyle} />
    case ILLA_DRIVE_OBJECT_TYPE.PDF:
      return <FilePdfIcon css={iconStyle} />
    case ILLA_DRIVE_OBJECT_TYPE.WORD:
      return <FileWordIcon css={iconStyle} />
    case ILLA_DRIVE_OBJECT_TYPE.EXCEL:
      return <FileExcelIcon css={iconStyle} />
    case ILLA_DRIVE_OBJECT_TYPE.PPT:
      return <FilePPTIcon css={iconStyle} />
    case ILLA_DRIVE_OBJECT_TYPE.FOLDER:
      return <FolderIcon css={iconStyle} />
    case ILLA_DRIVE_OBJECT_TYPE.ZIP:
      return <ZipIcon css={iconStyle} />
    case ILLA_DRIVE_OBJECT_TYPE.ANONYMOUS_FOLDER:
      return <AnonymousIcon css={iconStyle} />
    default:
      return <FileDefaultIcon css={iconStyle} />
  }
}

export const getFileIconByContentType = (
  type: GCS_OBJECT_TYPE,
  contentType?: string,
  iconStyle?: SerializedStyles,
): ReactNode => {
  const illaFileType = getFileTypeByContentType(type, contentType)
  return getFileIconByILLAFileType(illaFileType, iconStyle)
}
