import { S3ActionRequestType, S3_CONTENT_TYPE } from "@illa-public/public-types"

enum S3ActionType {
  LIST_ALL = "List all objects in bucket",
  READ_ONE = "Read an object",
  DOWNLOAD_ONE = "Download an object",
  DELETE_ONE = "Delete an object",
  DELETE_MULTIPLE = "Delete multiple objects",
  UPLOAD = "Upload data",
  UPLOAD_MULTIPLE = "Upload multiple data",
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

export const ContentTypeOptions = [
  {
    label: "Binary",
    value: S3_CONTENT_TYPE.BINARY,
  },
  {
    label: "CSV",
    value: S3_CONTENT_TYPE.CSV,
  },
  {
    label: "JSON",
    value: S3_CONTENT_TYPE.JSON,
  },
  {
    label: "String",
    value: S3_CONTENT_TYPE.STRING,
  },
]
