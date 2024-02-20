import { ILLA_DRIVE_ROOT_PATH } from "@illa-public/public-configs"
import {
  EXPIRATION_TYPE,
  ILLADriveAction,
  ILLADriveActionTypeContent,
  ILLADriveListAllContent,
  ILLADriveListFoldersContent,
  ILLADriveUpdateStatusAction,
  ILLADriveUploadMultipleContent,
  ILLADriveUploadOneContent,
  ILLA_DRIVE_ACTION_REQUEST_TYPE,
  ILLA_DRIVE_FILTER_TYPE,
  ILLA_DRIVE_UPLOAD_FILE_TYPE,
  UPLOAD_FILE_STATUS,
} from "@illa-public/public-types"
import { AxiosResponse } from "axios"
import { FILE_ITEM_DETAIL_STATUS_IN_UI } from "@/page/App/Module/UploadDetail/components/DetailList/interface"
import { updateFileDetailStore } from "@/page/App/Module/UploadDetail/store"
import { IActionRunResultResponseData } from "@/services/action"
import { dataURLtoFile } from "@/widgetLibrary/UploadWidget/util"
import {
  handleDownloadFromDriveResource,
  handleFileToDriveResource,
} from "../drive/upload/getSingedURL"
import { getContentTypeByFileExtension, getFileName } from "../file"
import { isBase64Simple } from "../url/base64"
import { fetchCommonActionResult } from "./runAction"

const getFileInfo = (
  fileName: string,
  fileData: string,
  fileType: ILLA_DRIVE_UPLOAD_FILE_TYPE,
) => {
  const isBase64 = isBase64Simple(fileData)
  const fileDownloadName = getFileName((fileName ?? "").trim(), fileType)
  const contentType = getContentTypeByFileExtension(
    fileDownloadName.split(".")[1],
  )
  let tmpData = fileData
  if (!isBase64) {
    tmpData = `data:${contentType};base64,${fileData}`
  }

  const needUploadFile = dataURLtoFile(tmpData, fileDownloadName)
  return {
    fileDownloadName,
    needUploadFile,
  }
}

const getPathForSignedUrl = (path: string) => {
  if (path === "/root") {
    return ""
  } else {
    return path.replace("/root", "")
  }
}

const removeSuffixPath = (path: string): string => {
  const regex = /^\/?(.*?)\/?$/
  return path?.match(regex)?.[1] || path
}

const scheduler = async (task: (() => Promise<any>)[]) => {
  return new Promise((resolve, reject) => {
    const run = async () => {
      if (task.length === 0) {
        return resolve(undefined)
      }
      task
        .shift()?.()
        .then(() => {
          run()
        })
        .catch((e) => {
          reject(e)
        })
    }
    run()
  })
}

const handleDetail = (
  name: string,
  path: string,
  contentType: ILLA_DRIVE_UPLOAD_FILE_TYPE,
  needUploadFile: File,
  queryID: string,
) => {
  const abortController = new AbortController()
  const uploadParams = {
    folder: getPathForSignedUrl(path),
    allowAnonymous: false,
    replace: false,
  }
  updateFileDetailStore.addFileDetailInfo({
    loaded: 0,
    total: 0,
    status: FILE_ITEM_DETAIL_STATUS_IN_UI.WAITING,
    fileName: name,
    contentType: contentType,
    queryID: queryID,
    abortController,
    saveToILLADriveParams: {
      fileData: needUploadFile,
      ...uploadParams,
    },
  })
  return abortController
}

const handleUploadOne = async (
  fileID: string,
  uploadURL: string,
  needUploadFile: File,
  queryID: string,
  abortController: AbortController,
) => {
  const res = await handleFileToDriveResource(
    queryID,
    fileID,
    uploadURL,
    needUploadFile,
    abortController.signal,
  )
  return res
}

export const transformDriveData = (
  contents: ILLADriveAction<ILLADriveActionTypeContent>,
) => {
  const operation = contents.operation
  switch (operation) {
    case ILLA_DRIVE_ACTION_REQUEST_TYPE.LIST: {
      const commandArgs = contents.commandArgs as ILLADriveListAllContent
      return {
        ...commandArgs,
        operation,
        path: `/${removeSuffixPath(commandArgs.path) || ILLA_DRIVE_ROOT_PATH}`,
        search:
          commandArgs.filterType === ILLA_DRIVE_FILTER_TYPE.BY_NAME
            ? commandArgs.search
            : undefined,
        fileID:
          commandArgs.filterType === ILLA_DRIVE_FILTER_TYPE.BY_ID
            ? commandArgs.fileID
            : undefined,
        expiry:
          commandArgs.expirationType === EXPIRATION_TYPE.CUSTOM
            ? `${commandArgs.expiry ?? 300}s`
            : undefined,
      }
    }
    case ILLA_DRIVE_ACTION_REQUEST_TYPE.LIST_FOLDERS: {
      const commandArgs = contents.commandArgs as ILLADriveListFoldersContent
      return {
        ...commandArgs,
        operation,
        path: `/${removeSuffixPath(commandArgs.path) || ILLA_DRIVE_ROOT_PATH}`,
        search:
          commandArgs.filterType === ILLA_DRIVE_FILTER_TYPE.BY_NAME
            ? commandArgs.search
            : undefined,
        folderID:
          commandArgs.filterType === ILLA_DRIVE_FILTER_TYPE.BY_ID
            ? commandArgs.folderID
            : undefined,
      }
    }
    case ILLA_DRIVE_ACTION_REQUEST_TYPE.UPLOAD: {
      const commandArgs = contents.commandArgs as ILLADriveUploadOneContent
      const { fileDownloadName, needUploadFile } = getFileInfo(
        commandArgs.fileName,
        commandArgs.fileData,
        commandArgs.fileType,
      )
      return {
        operation,
        path: `/${removeSuffixPath(commandArgs.path) || ILLA_DRIVE_ROOT_PATH}`,
        overwriteDuplicate: commandArgs.overwriteDuplicate,
        fileName: fileDownloadName,
        fileSize: needUploadFile.size,
        contentType: needUploadFile.type,
        needUploadFile: needUploadFile,
      }
    }

    case ILLA_DRIVE_ACTION_REQUEST_TYPE.UPLOAD_MULTIPLE:
      const commandArgs = contents.commandArgs as ILLADriveUploadMultipleContent
      const files: Record<string, string | number | File>[] = []
      let minLength = Math.min(
        commandArgs.fileDataArray.length,
        commandArgs.fileNameArray.length,
        commandArgs.fileTypeArray.length,
      )

      for (let i = 0; i < minLength; i++) {
        let fileType = commandArgs.fileTypeArray[
          i
        ] as ILLA_DRIVE_UPLOAD_FILE_TYPE
        if (!Object.values(ILLA_DRIVE_UPLOAD_FILE_TYPE).includes(fileType)) {
          fileType = ILLA_DRIVE_UPLOAD_FILE_TYPE.AUTO
        }
        const { fileDownloadName, needUploadFile } = getFileInfo(
          commandArgs.fileNameArray[i],
          commandArgs.fileDataArray[i],
          fileType,
        )
        files.push({
          fileName: fileDownloadName,
          fileSize: needUploadFile.size,
          contentType: needUploadFile.type,
          needUploadFile,
        })
      }

      return {
        operation,
        path: `/${removeSuffixPath(commandArgs.path) || ILLA_DRIVE_ROOT_PATH}`,
        overwriteDuplicate: commandArgs.overwriteDuplicate,
        files,
      }
    case ILLA_DRIVE_ACTION_REQUEST_TYPE.DOWNLOAD_ONE:
    case ILLA_DRIVE_ACTION_REQUEST_TYPE.DOWNLOAD_MULTIPLE:
    case ILLA_DRIVE_ACTION_REQUEST_TYPE.DELETE_ONE:
    case ILLA_DRIVE_ACTION_REQUEST_TYPE.DELETE_MULTIPLE:
    case ILLA_DRIVE_ACTION_REQUEST_TYPE.UPDATE: {
      return {
        operation,
        ...contents.commandArgs,
      }
    }
  }
}

interface IUploadRes {
  fileID: string
  status: UPLOAD_FILE_STATUS
}
export const fetchILLADriveClientResult = async (
  isPublic: boolean,
  resourceID: string,
  displayName: string,
  appId: string,
  actionID: string,
  actionContent: Record<string, any>,
  response: AxiosResponse<
    IActionRunResultResponseData<Record<string, any>[]>,
    unknown
  >,
) => {
  try {
    const { operation } = actionContent || {}
    if (!Object.values(ILLA_DRIVE_ACTION_REQUEST_TYPE).includes(operation)) {
      return Promise.reject("no method")
    }
    let result = response
    switch (operation) {
      case ILLA_DRIVE_ACTION_REQUEST_TYPE.UPLOAD: {
        const uploadInfo = response.data.Rows[0]
        const queryID = `${uploadInfo.name}_${new Date().getTime()}`
        try {
          const abortController = handleDetail(
            uploadInfo.name,
            actionContent.path,
            actionContent.contentType,
            actionContent.needUploadFile,
            queryID,
          )
          const res = await handleUploadOne(
            uploadInfo.id,
            uploadInfo.url,
            actionContent.needUploadFile,
            queryID,
            abortController,
          )
          if (res && res.status === UPLOAD_FILE_STATUS.COMPLETE) {
            const content: ILLADriveUpdateStatusAction = {
              operation: ILLA_DRIVE_ACTION_REQUEST_TYPE.UPDATE_FILE_STATUS,
              fileID: res.fileID,
              status: res.status,
            }
            result = await fetchCommonActionResult(
              isPublic,
              resourceID,
              "illadrive",
              displayName,
              appId,
              actionID,
              content,
            )
          } else {
            result = {
              ...result,
              data: {
                Rows: [],
                Extra: null,
                Success: false,
              },
            }
          }
          updateFileDetailStore.updateFileDetailInfo(queryID, {
            status: result.data.Success
              ? FILE_ITEM_DETAIL_STATUS_IN_UI.SUCCESS
              : FILE_ITEM_DETAIL_STATUS_IN_UI.ERROR,
          })
        } catch (e) {
          updateFileDetailStore.updateFileDetailInfo(queryID, {
            status: FILE_ITEM_DETAIL_STATUS_IN_UI.ERROR,
          })
          throw e
        }
        break
      }
      case ILLA_DRIVE_ACTION_REQUEST_TYPE.UPLOAD_MULTIPLE: {
        if (!response.data.Rows.length) {
          throw new Error("error")
        }
        const uploadCallbackFns: (() => Promise<void>)[] = []
        const updateStatusCallbackFns: ((
          res: IUploadRes | undefined,
        ) => Promise<void>)[] = []
        const uploadRes: (IUploadRes | undefined)[] = []
        const queryIDs: string[] = []
        const updateStatusData: Record<string, any>[] = []
        response.data.Rows.forEach((uploadInfo, index) => {
          const queryID = `${uploadInfo.name}_${new Date().getTime()}`
          queryIDs.push(queryID)
          const { files = [] } = actionContent
          const abortController = handleDetail(
            uploadInfo.name,
            actionContent.path,
            files[index]?.contentType,
            files[index]?.needUploadFile,
            queryID,
          )
          const fn = async () => {
            const res = await handleUploadOne(
              uploadInfo.id,
              uploadInfo.url,
              files[index]?.needUploadFile,
              queryID,
              abortController,
            )
            if (res && res.status !== UPLOAD_FILE_STATUS.FAILED) {
              uploadRes.push(res)
            }
          }
          const updateStatus = async (res: IUploadRes | undefined) => {
            const content: ILLADriveUpdateStatusAction = {
              operation: ILLA_DRIVE_ACTION_REQUEST_TYPE.UPDATE_FILE_STATUS,
              fileID: res!.fileID,
              status: res!.status,
            }
            const updateStatusRes = await fetchCommonActionResult(
              isPublic,
              resourceID,
              "illadrive",
              displayName,
              appId,
              actionID,
              content,
            )
            updateStatusData.push(updateStatusRes?.data?.Rows[0])
          }
          uploadCallbackFns.push(fn)
          updateStatusCallbackFns.push(updateStatus)
        })
        try {
          await scheduler(uploadCallbackFns)
          const updateStatus = async () => {
            return new Promise((resolve, reject) => {
              const run = async () => {
                if (updateStatusCallbackFns.length === 0) {
                  return resolve(undefined)
                }
                updateStatusCallbackFns
                  .shift()?.(uploadRes.shift())
                  .then(() => {
                    run()
                  })
                  .catch((e) => {
                    return reject(e)
                  })
              }
              run()
            })
          }
          await updateStatus()
          queryIDs.forEach((queryID) => {
            updateFileDetailStore.updateFileDetailInfo(queryID, {
              status: FILE_ITEM_DETAIL_STATUS_IN_UI.SUCCESS,
            })
          })
          result = {
            ...result,
            data: {
              Rows: updateStatusData,
              Extra: null,
              Success: true,
            },
          }
        } catch (e) {
          queryIDs.forEach((queryID) => {
            updateFileDetailStore.updateFileDetailInfo(queryID, {
              status: FILE_ITEM_DETAIL_STATUS_IN_UI.ERROR,
            })
          })
          throw e
        }
        break
      }
      case ILLA_DRIVE_ACTION_REQUEST_TYPE.DOWNLOAD_ONE: {
        let downloadInfo = response.data.Rows[0] as {
          name: string
          downloadURL: string
        }
        await handleDownloadFromDriveResource([downloadInfo])
        result = {
          ...result,
          data: {
            Rows: [],
            Extra: null,
            Success: true,
          },
        }
        break
      }
      case ILLA_DRIVE_ACTION_REQUEST_TYPE.DOWNLOAD_MULTIPLE: {
        let downloadInfo = response.data.Rows as {
          name: string
          downloadURL: string
        }[]
        await handleDownloadFromDriveResource(downloadInfo, true)
        result = {
          ...result,
          data: {
            Rows: [],
            Extra: null,
            Success: true,
          },
        }
        break
      }
      default:
        return response
    }
    return result
  } catch (e) {
    throw e
  }
}

export const transformDriveResFormat = (
  response: AxiosResponse,
  actionContent: ILLADriveAction<ILLADriveActionTypeContent>,
) => {
  const { operation } = actionContent
  switch (operation) {
    case ILLA_DRIVE_ACTION_REQUEST_TYPE.UPLOAD_MULTIPLE: {
      return {
        data: response.data.Rows,
      }
    }
    case ILLA_DRIVE_ACTION_REQUEST_TYPE.LIST: {
      const files = response.data.Rows?.[0]?.Files || []
      return {
        data: files,
      }
    }
    default: {
      return {
        data: response.data.Rows?.[0],
      }
    }
  }
}
