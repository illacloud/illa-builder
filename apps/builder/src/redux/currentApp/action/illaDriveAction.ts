import { UPLOAD_FILE_STATUS } from "@illa-public/public-types"
import i18n from "@/i18n/config"

export enum ILLA_DRIVE_ACTION_REQUEST_TYPE {
  LIST = "ListFiles",
  DOWNLOAD_ONE = "GetDownloadAddress",
  DOWNLOAD_MULTIPLE = "GetMultipleDownloadAddress",
  DELETE_ONE = "DeleteFile",
  DELETE_MULTIPLE = "DeleteMultipleFile",
  UPLOAD = "GetUploadAddress",
  UPLOAD_MULTIPLE = "GetMultipleUploadAddress",
  UPDATE = "RenameFile",
  UPDATE_FILE_STATUS = "UpdateFileStatus",
}

export enum EXPIRATION_TYPE {
  PERSISTENT = "persistent",
  CUSTOM = "custom",
}

export enum FILTER_TYPE {
  NONE = "none",
  BY_ID = "byID",
  BY_NAME = "byName",
}

export enum UPLOAD_FILE_TYPE {
  AUTO = "auto",
  TXT = "txt",
  JPEG = "jpeg",
  PNG = "png",
  SVG = "svg",
  JSON = "json",
  CSV = "csv",
  TSV = "tsv",
  XLSX = "xlsx",
}

export interface ListAllContent {
  filterType: FILTER_TYPE
  search: string
  fileID: string
  path: string
  expirationType: EXPIRATION_TYPE
  expiry: string
  hotlinkProtection: boolean
  limit: string
  page: string
}

export const ListAllContentInitial: ListAllContent = {
  filterType: FILTER_TYPE.NONE,
  search: "",
  fileID: "",
  path: "",
  expirationType: EXPIRATION_TYPE.PERSISTENT,
  hotlinkProtection: true,
  expiry: "",
  limit: "{{20}}",
  page: "{{1}}",
}

export interface UploadOneContent {
  overwriteDuplicate: boolean
  fileData: string
  fileName: string
  fileType: UPLOAD_FILE_TYPE
  path: string
}

export const UploadOneContentInitial: UploadOneContent = {
  overwriteDuplicate: false,
  fileData: "",
  fileName: "",
  fileType: UPLOAD_FILE_TYPE.AUTO,
  path: "",
}

export interface UploadMultipleContent {
  overwriteDuplicate: boolean
  fileNameArray: string
  fileDataArray: string
  fileTypeArray: string
  path: string
}

export const UploadMultipleContentInitial: UploadMultipleContent = {
  overwriteDuplicate: false,
  fileNameArray: "",
  fileDataArray: "",
  fileTypeArray: "",
  path: "",
}

export interface DownloadOneContent {
  fileID: string
}

export const DownloadOneContentInitial: DownloadOneContent = {
  fileID: "",
}

export interface DownloadMultipleContent {
  fileIDs: string
}

export const DownloadMultipleContentInitial: DownloadMultipleContent = {
  fileIDs: "",
}

export interface DeleteOneContent {
  fileID: string
}

export const DeleteOneContentInitial: DeleteOneContent = {
  fileID: "",
}

export interface DeleteMultipleContent {
  fileIDs: string
}

export const DeleteMultipleContentInitial: DeleteMultipleContent = {
  fileIDs: "",
}

export interface UpdateContent {
  fileID: string
  fileName: string
}

export const UpdateContentInitial: UpdateContent = {
  fileID: "",
  fileName: "",
}

export type ILLADriveActionTypeContent =
  | ListAllContent
  | DownloadOneContent
  | DownloadMultipleContent
  | DeleteOneContent
  | DeleteMultipleContent
  | UploadOneContent
  | UploadMultipleContent
  | UpdateContent

export interface ILLADriveAction<T> {
  operation: ILLA_DRIVE_ACTION_REQUEST_TYPE
  commandArgs: T
}

export interface ILLADriveUpdateStatusAction {
  operation: ILLA_DRIVE_ACTION_REQUEST_TYPE.UPDATE_FILE_STATUS
  fileID: string
  status: UPLOAD_FILE_STATUS
}

export const ILLDriveActionInitial: ILLADriveAction<ListAllContent> = {
  operation: ILLA_DRIVE_ACTION_REQUEST_TYPE.LIST,
  commandArgs: ListAllContentInitial,
}

export const FileUrlExpiredTypeOption = [
  {
    label: i18n.t(
      "editor.inspect.setter_option.drive_builder.expired_time.never",
    ),
    value: EXPIRATION_TYPE.PERSISTENT,
  },
  {
    label: i18n.t(
      "editor.inspect.setter_option.drive_builder.expired_time.customer",
    ),
    value: EXPIRATION_TYPE.CUSTOM,
  },
]

export const FilterTypeOption = [
  {
    label: i18n.t("editor.action.panel.label.option.drive.file_type.none"),
    value: FILTER_TYPE.NONE,
  },
  {
    label: i18n.t("editor.action.panel.label.option.drive.file_type.by_id"),
    value: FILTER_TYPE.BY_ID,
  },
  {
    label: i18n.t("editor.action.panel.label.option.drive.file_type.by_name"),
    value: FILTER_TYPE.BY_NAME,
  },
]

export const FileTypeOptions = [
  {
    label: i18n.t("editor.inspect.setter_option.file_download.auto"),
    value: UPLOAD_FILE_TYPE.AUTO,
  },
  {
    label: i18n.t("editor.inspect.setter_option.file_download.plain_text"),
    value: UPLOAD_FILE_TYPE.TXT,
  },
  {
    label: i18n.t("editor.inspect.setter_option.file_download.jpeg"),
    value: UPLOAD_FILE_TYPE.JPEG,
  },
  {
    label: i18n.t("editor.inspect.setter_option.file_download.png"),
    value: UPLOAD_FILE_TYPE.PNG,
  },
  {
    label: i18n.t("editor.inspect.setter_option.file_download.svg"),
    value: UPLOAD_FILE_TYPE.SVG,
  },
  {
    label: i18n.t("editor.inspect.setter_option.file_download.json"),
    value: UPLOAD_FILE_TYPE.JSON,
  },
  {
    label: i18n.t("editor.inspect.setter_option.file_download.csv"),
    value: UPLOAD_FILE_TYPE.CSV,
  },
  {
    label: i18n.t("editor.inspect.setter_option.file_download.tsv"),
    value: UPLOAD_FILE_TYPE.TSV,
  },
  {
    label: i18n.t("editor.inspect.setter_option.file_download.excel"),
    value: UPLOAD_FILE_TYPE.XLSX,
  },
]

export const ILLADriveActionList = [
  {
    label: i18n.t("editor.action.panel.label.option.drive.method.list"),
    value: ILLA_DRIVE_ACTION_REQUEST_TYPE.LIST,
  },
  {
    label: i18n.t("editor.action.panel.label.option.drive.method.download"),
    value: ILLA_DRIVE_ACTION_REQUEST_TYPE.DOWNLOAD_ONE,
  },
  {
    label: i18n.t(
      "editor.action.panel.label.option.drive.method.download_multi_file",
    ),
    value: ILLA_DRIVE_ACTION_REQUEST_TYPE.DOWNLOAD_MULTIPLE,
  },
  {
    label: i18n.t("editor.action.panel.label.option.drive.method.delete"),
    value: ILLA_DRIVE_ACTION_REQUEST_TYPE.DELETE_ONE,
  },
  {
    label: i18n.t(
      "editor.action.panel.label.option.drive.method.delete_multi_file",
    ),
    value: ILLA_DRIVE_ACTION_REQUEST_TYPE.DELETE_MULTIPLE,
  },
  {
    label: i18n.t("editor.action.panel.label.option.drive.method.upload_file"),
    value: ILLA_DRIVE_ACTION_REQUEST_TYPE.UPLOAD,
  },
  {
    label: i18n.t(
      "editor.action.panel.label.option.drive.method.upload_multi_file",
    ),
    value: ILLA_DRIVE_ACTION_REQUEST_TYPE.UPLOAD_MULTIPLE,
  },
  {
    label: i18n.t("editor.action.panel.label.option.drive.method.update"),
    value: ILLA_DRIVE_ACTION_REQUEST_TYPE.UPDATE,
  },
]

export const ROOT_PATH = "/root"
