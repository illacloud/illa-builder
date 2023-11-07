import { driveRequest, publicDriveRequest } from "@illa-public/illa-net"
import {
  DRIVE_FILE_TYPE,
  DUPLICATION_HANDLER,
  EXPIRATION_TYPE,
  FILE_CATEGORY,
  GCS_OBJECT_TYPE,
  SORTED_TYPE,
  UPLOAD_FILE_DUPLICATION_HANDLER,
  UPLOAD_FILE_STATUS,
} from "@illa-public/public-types"
import { stringify } from "qs"
import { getCurrentTeamID, getCurrentTeamIdentifier } from "../utils/team"

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
  abortSignal?: AbortSignal,
) => {
  return await driveRequest<IFetchUploadFilesToAnonymousFolderResponse>(
    {
      url: `/apps/${appID}/files`,
      method: "POST",
      data: {
        ...requestData,
        resumable: true,
      },
      signal: abortSignal,
    },
    {
      teamIdentifier: getCurrentTeamIdentifier(),
    },
  )
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
  abortSignal?: AbortSignal,
) => {
  return await driveRequest<IFetchUploadFileURLResponse>(
    {
      url: `/files`,
      method: "POST",
      data: {
        ...requestData,
        resumable: true,
      },
      signal: abortSignal,
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

export interface IFetchFileListRequestData {
  path: string
  page?: number
  limit?: number
  type: DRIVE_FILE_TYPE
  search?: string
  sortedBy?: string
  sortedType?: SORTED_TYPE
  fileCategory?: FILE_CATEGORY
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

export const fetchGenerateTinyUrl = async (
  data: IFetchGenerateTinyURLRequestData,
  abortSignal?: AbortSignal,
) => {
  return await driveRequest<IFetchGenerateBatchTinyURLResponse>(
    {
      url: "/links",
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

interface IFetchCheckFileExistRequestData {
  folderID: string
  name: string
  type: GCS_OBJECT_TYPE
}

interface IFetchCheckFileExistResponseData {
  name: string
  isDuplicated: boolean
}

export const fetchCheckFileExist = async (
  data: IFetchCheckFileExistRequestData[],
  abortSignal?: AbortSignal,
) => {
  return await driveRequest<IFetchCheckFileExistResponseData[]>(
    {
      url: `/files/duplicate`,
      method: "POST",
      data,
      signal: abortSignal,
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

interface IFetchFileDetailRequestData {
  name: string
  folderID: string
  type: GCS_OBJECT_TYPE
  size: number
  resumable?: boolean
  duplicationHandler: DUPLICATION_HANDLER
  contentType: string
}

interface IFetchFIleDetailResponseData {
  id: string
  name: string
  type: GCS_OBJECT_TYPE
  url: string
  resumable: boolean
}

export const fetchGCSUploadPresignedURL = async (
  data: IFetchFileDetailRequestData,
  abortSignal?: AbortSignal,
) => {
  try {
    const response = await driveRequest<IFetchFIleDetailResponseData>(
      {
        url: "/files",
        method: "POST",
        data: {
          resumable: true,
          ...data,
        },
        signal: abortSignal,
      },
      { teamID: getCurrentTeamID() },
    )
    return Promise.resolve(response)
  } catch (e) {
    return Promise.reject(e)
  }
}
