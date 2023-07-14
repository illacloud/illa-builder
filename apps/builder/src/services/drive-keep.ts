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
        folderID: "",
      },
    },
    {
      needTeamID: true,
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
      needTeamID: true,
    },
  )
}

interface IFetchGetUploadFileURLRequest {
  name: string
  type: GCS_OBJECT_TYPE
  contentType: string
  size: number
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
        folderID: "",
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
  return await driveRequest({
    url: `/files/${fileID}/status`,
    method: "POST",
    data: {
      status,
    },
  })
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
    url: `${tinyURL}/${fileID}`,
    method: "GET",
  })
}
