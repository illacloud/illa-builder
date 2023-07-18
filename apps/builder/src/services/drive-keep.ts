import { stringify } from "qs"
import { driveRequest, publicDriveRequest } from "../api/http"

export enum UPLOAD_FILE_DUPLICATION_HANDLER {
  COVER = "cover",
  RENAME = "rename",
  MANUAL = "manual",
}

export enum GCS_OBJECT_TYPE {
  FOLDER = "folder",
  FILE = "file",
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
      needTeamIdentifier: true,
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
      needTeamIdentifier: true,
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
      needTeamID: true,
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
      needTeamID: true,
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

export enum DRIVE_FILE_TYPE {
  MIX = 1,
  FOLDER = 2,
  FILE = 3,
}

export enum SORTED_TYPE {
  ascend = "asc",
  descend = "desc",
}

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

export interface IFetchFileListResponseData {
  path: string
  currentFolderID: string
  files: IILLAFileInfo[]
  total: number
  pageSize: number
  pageIndex: number
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
      needTeamID: true,
    },
  )
}

export enum FILE_UPLOAD_STATUS {
  COMPLETE = "complete",
  FAILED = "failed",
  PAUSED = "paused",
  CANCELED = "canceled",
}
