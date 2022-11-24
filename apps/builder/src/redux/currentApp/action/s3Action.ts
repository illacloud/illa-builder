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
}

export const ReadOneContentInitial: ReadOneContent = {
  bucketName: "",
  objectKey: "",
}

export interface DownloadOneContent {
  bucketName: string
  objectKey: string
}

export const DownloadOneContentInitial: DownloadOneContent = {
  bucketName: "",
  objectKey: "",
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
}

export const UploadContentInitial: UploadContent = {
  bucketName: "",
  contentType: "",
  objectKey: "",
  objectData: "",
}

export interface UploadMultipleContent {
  bucketName: string
  contentType: string
  objectKeyList: string
  objectDataList: string
}

export const UploadMultipleContentInitial: UploadMultipleContent = {
  bucketName: "",
  contentType: "",
  objectKeyList: "",
  objectDataList: "",
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
