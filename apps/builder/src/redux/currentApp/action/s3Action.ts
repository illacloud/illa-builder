export enum S3ActionType {
  LIST_ALL = "List all objects in bucket",
  READ_ONE = "Read an object",
  DOWNLOAD_ONE = "Download an object",
  DELETE_ONE = "Delete an object",
  DELETE_MULTIPLE = "Delete multiple objects",
  UPLOAD = "Upload data",
  UPLOAD_MULTIPLE = "Upload multiple data",
}

export enum S3ActionRequestType {
  LIST_ALL = "list",
  READ_ONE = "read",
  DOWNLOAD_ONE = "download",
  DELETE_ONE = "delete",
  DELETE_MULTIPLE = "batchDelete",
  UPLOAD = "upload",
  UPLOAD_MULTIPLE = "batchUpload",
}

export const S3ActionList = [
  {
    label: S3ActionType.LIST_ALL,
    value: S3ActionRequestType.LIST_ALL,
  },
  {
    label: S3ActionType.READ_ONE,
    value: S3ActionRequestType.READ_ONE,
  },
  {
    label: S3ActionType.DOWNLOAD_ONE,
    value: S3ActionRequestType.DOWNLOAD_ONE,
  },
  {
    label: S3ActionType.DELETE_ONE,
    value: S3ActionRequestType.DELETE_ONE,
  },
  {
    label: S3ActionType.DELETE_MULTIPLE,
    value: S3ActionRequestType.DELETE_MULTIPLE,
  },
  {
    label: S3ActionType.UPLOAD,
    value: S3ActionRequestType.UPLOAD,
  },
  {
    label: S3ActionType.UPLOAD_MULTIPLE,
    value: S3ActionRequestType.UPLOAD_MULTIPLE,
  },
]

export const ClientS3 = [
  S3ActionRequestType.READ_ONE,
  S3ActionRequestType.DOWNLOAD_ONE,
  S3ActionRequestType.UPLOAD,
  S3ActionRequestType.UPLOAD_MULTIPLE,
]

export interface ListAllContent {
  bucketName: string
  prefix: string
  delimiter: string
  signedURL: boolean
  expiry: string
  maxKeys: string
}

export const ListAllContentInitial: ListAllContent = {
  bucketName: "",
  prefix: "",
  delimiter: "",
  signedURL: false,
  expiry: "{{5}}",
  maxKeys: "{{100}}",
}

export interface ReadOneContent {
  bucketName: string
  objectKey: string
  signedURL: boolean
  expiry: string
}

export const ReadOneContentInitial: ReadOneContent = {
  bucketName: "",
  objectKey: "",
  signedURL: false,
  expiry: "{{5}}",
}

export interface DownloadOneContent {
  bucketName: string
  objectKey: string
  signedURL: boolean
  expiry: string
}

export const DownloadOneContentInitial: DownloadOneContent = {
  bucketName: "",
  objectKey: "",
  signedURL: false,
  expiry: "{{5}}",
}

export interface DeleteOneContent {
  bucketName: string
  objectKey: string
}

export const DeleteOneContentInitial: DeleteOneContent = {
  bucketName: "",
  objectKey: "",
}

export interface DeleteMultipleContent {
  bucketName: string
  objectKeyList: string
}

export const DeleteMultipleContentInitial: DeleteMultipleContent = {
  bucketName: "",
  objectKeyList: "",
}

export type ContentType = "base64" | "text" | "binary"

export interface UploadContent {
  bucketName: string
  contentType: string
  objectKey: string
  objectData: string
  expiry: string
}

export const UploadContentInitial: UploadContent = {
  bucketName: "",
  contentType: "",
  objectKey: "",
  objectData: "",
  expiry: "{{1}}",
}

export interface UploadMultipleContent {
  bucketName: string
  contentType: string
  objectKeyList: string
  objectDataList: string
  expiry: string
}

export const UploadMultipleContentInitial: UploadMultipleContent = {
  bucketName: "",
  contentType: "",
  objectKeyList: "",
  objectDataList: "",
  expiry: "{{1}}",
}

export type S3ActionTypeContent =
  | ListAllContent
  | ReadOneContent
  | DownloadOneContent
  | DeleteOneContent
  | DeleteMultipleContent
  | UploadContent
  | UploadMultipleContent

export interface S3Action<T extends S3ActionTypeContent> {
  commands: S3ActionRequestType
  commandArgs: T
}

export const S3ActionInitial: S3Action<ListAllContent> = {
  commands: S3ActionRequestType.LIST_ALL,
  commandArgs: {
    bucketName: "",
    prefix: "",
    delimiter: "",
    signedURL: false,
    expiry: "{{5}}",
    maxKeys: "{{100}}",
  },
}

export const SelectOption = [
  {
    label: "No",
    value: 0,
  },
  {
    label: "Yes",
    value: 1,
  },
]
