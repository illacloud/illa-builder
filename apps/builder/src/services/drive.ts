import { driveRequest, publicDriveRequest } from "@illa-public/illa-net"
import { stringify } from "qs"
import { getCurrentTeamID, getCurrentTeamIdentifier } from "../utils/team"

export enum UPLOAD_FILE_DUPLICATION_HANDLER {
  COVER = "cover",
  RENAME = "rename",
  MANUAL = "manual",
}

export enum GCS_OBJECT_TYPE {
  FOLDER = "folder",
  FILE = "file",
  ANONYMOUS_FOLDER = "anonymousFolder",
}

interface IFetchUploadFilesToAnonymousFolderRequest {
  name: string
  type: GCS_OBJECT_TYPE
  contentType: string
  size: number
  duplicationHandler: UPLOAD_FILE_DUPLICATION_HANDLER
}

interface IFetchUploadFilesToAnonymousFolderResponse {
  id: string
  name: string
  folderID: string
  type: GCS_OBJECT_TYPE
  resumable: boolean
  url: string
}

export const fetchUploadFilesToAnonymous = async (
  appID: string,
  requestData: IFetchUploadFilesToAnonymousFolderRequest,
) => {
  return await driveRequest<IFetchUploadFilesToAnonymousFolderResponse>(
    {
      url: `/apps/${appID}/files`,
      method: "POST",
      data: {
        ...requestData,
        resumable: true,
      },
    },
    {
      teamIdentifier: getCurrentTeamIdentifier(),
    },
  )
}

export enum UPLOAD_FILE_STATUS {
  COMPLETE = "complete",
  FAILED = "failed",
  PAUSED = "paused",
  CANCELED = "canceled",
}

export const fetchUploadFilesStatusAnonymous = async (
  appID: string,
  fileID: string,
  status: UPLOAD_FILE_STATUS,
) => {
  return await driveRequest(
    {
      url: `/apps/${appID}/files/${fileID}/status`,
      method: "PUT",
      data: {
        status,
      },
    },
    {
      teamIdentifier: getCurrentTeamIdentifier(),
    },
  )
}

interface IFetchGetUploadFileURLRequest {
  name: string
  type: GCS_OBJECT_TYPE
  contentType: string
  size: number
  folderID: string
  duplicationHandler: UPLOAD_FILE_DUPLICATION_HANDLER
}

interface IFetchUploadFileURLResponse {
  id: string
  name: string
  folderID: string
  type: GCS_OBJECT_TYPE
  resumable: boolean
  url: string
}

export const fetchGetUploadFileURL = async (
  requestData: IFetchGetUploadFileURLRequest,
) => {
  return await driveRequest<IFetchUploadFileURLResponse>(
    {
      url: `/files`,
      method: "POST",
      data: {
        ...requestData,
        resumable: true,
      },
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

export const fetchUpdateFileStatus = async (
  fileID: string,
  status: UPLOAD_FILE_STATUS,
) => {
  return await driveRequest(
    {
      url: `/files/${fileID}/status`,
      method: "PUT",
      data: {
        status,
      },
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

interface IFetchDownloadURLByTinyURL {
  name: string
  contentType: string
  size: number
  downloadURL: string
  createdAt: string
  lastModifiedAt: string
}

export const fetchDownloadURLByTinyURL = async (
  tinyURL: string,
  fileID: string,
) => {
  return await publicDriveRequest<IFetchDownloadURLByTinyURL>({
    url: `/${tinyURL}/${fileID}`,
    method: "GET",
  })
}

export enum FILE_UPLOAD_STATUS {
  COMPLETE = "complete",
  FAILED = "failed",
  PAUSED = "paused",
  CANCELED = "canceled",
}

// -------------------
export interface IILLAFileInfo {
  id: string
  name: string
  type: GCS_OBJECT_TYPE
  contentType: string
  size: number
  createdAt: string
  lastModifiedAt: string
  lastModifiedBy: string
  owner: string
}

export enum DRIVE_FILE_TYPE {
  MIX = 1,
  FOLDER = 2,
  FILE = 3,
}

export enum SORTED_TYPE {
  ascend = "asc",
  descend = "desc",
}

export interface IFetchFileListRequestData {
  path: string
  page?: number
  limit?: number
  type: DRIVE_FILE_TYPE
  search?: string
  sortedBy?: string
  sortedType?: SORTED_TYPE
}

export interface IFetchFileListResponseData {
  path: string
  currentFolderID: string
  files: IILLAFileInfo[]
  total: number
  pageSize: number
  pageIndex: number
}

export const fetchFileList = async (
  requestData: IFetchFileListRequestData = {
    path: "/root",
    type: DRIVE_FILE_TYPE.MIX,
  },
  abortSignal?: AbortSignal,
) => {
  const qs = stringify(requestData)
  return await driveRequest<IFetchFileListResponseData>(
    {
      url: "/files?" + qs,
      method: "GET",
      signal: abortSignal,
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}
export const fetchAnonymousFileList = async (
  appID: string,
  requestData: IFetchFileListRequestData = {
    path: "/root",
    type: DRIVE_FILE_TYPE.MIX,
  },
  abortSignal?: AbortSignal,
) => {
  const qs = stringify(requestData)
  return await driveRequest<IFetchFileListResponseData>(
    {
      url: `/apps/${appID}/files?${qs}`,
      method: "GET",
      signal: abortSignal,
    },
    {
      teamIdentifier: getCurrentTeamIdentifier(),
    },
  )
}

export enum EXPIRATION_TYPE {
  "PERSISTENT" = "persistent",
  "CUSTOM" = "custom",
}

interface IFetchGenerateTinyURLRequestData {
  ids: string[]
  expirationType: EXPIRATION_TYPE
  expiry?: string
  hotlinkProtection: boolean
}

interface IFetchGenerateTinyURLResponseData {
  tinyURL: string
  expirationType: EXPIRATION_TYPE
  expiry?: string
  hotlinkProtection: boolean
  createdAt: string
  createdBy: string
  cdn: boolean
}

export type IFetchGenerateBatchTinyURLResponse =
  IFetchGenerateTinyURLResponseData & { fileID: string }
export const fetchBatchGenerateTinyUrl = async (
  data: IFetchGenerateTinyURLRequestData,
  abortSignal?: AbortSignal,
) => {
  return await driveRequest<IFetchGenerateBatchTinyURLResponse[]>(
    {
      url: "/links/batch",
      method: "POST",
      data,
      signal: abortSignal,
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

export const fetchBatchAnonymousGenerateTinyUrl = async (
  appID: string,
  data: IFetchGenerateTinyURLRequestData,
  abortSignal?: AbortSignal,
) => {
  return await driveRequest<IFetchGenerateBatchTinyURLResponse[]>(
    {
      url: `/apps/${appID}/links/batch`,
      method: "POST",
      data,
      signal: abortSignal,
    },
    {
      teamIdentifier: getCurrentTeamIdentifier(),
    },
  )
}

export interface IFetchAnonymousPermissionResponseData {
  anonymous: boolean
}

export const fetchAnonymousPermission = async () => {
  return await driveRequest<IFetchAnonymousPermissionResponseData>(
    {
      url: `/setting/anonymous`,
      method: "GET",
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

export const fetchOpenAnonymousPermission = async () => {
  return await driveRequest(
    {
      url: `/setting/anonymous`,
      method: "POST",
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

export const fetchCloseAnonymousPermission = async () => {
  return await driveRequest(
    {
      url: `/setting/anonymous`,
      method: "DELETE",
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}
