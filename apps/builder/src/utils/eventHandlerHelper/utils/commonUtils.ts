import copy from "copy-to-clipboard"
import download from "downloadjs"
import {
  NotificationType,
  createMessage,
  createNotification,
  isArray,
} from "@illa-design/react"
import i18n from "@/i18n/config"
import { getIsILLAProductMode } from "@/redux/config/configSelector"
import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { SectionViewShape } from "@/redux/currentApp/editor/components/componentsState"
import { getRootNodeExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { UpdateExecutionByDisplayNamePayload } from "@/redux/currentApp/executionTree/executionState"
import { ILLARoute } from "@/router"
import store from "@/store"
import { LIMIT_MEMORY, estimateMemoryUsage } from "@/utils/calculateMemoryUsage"
import {
  convertToCSV,
  convertToTSV,
  downloadExcelFile,
  downloadFileFromURL,
  getContentTypeByFileExtension,
  getFileName,
} from "@/utils/file"
import { isBlobURLOrUrl, isObject, isValidUrlScheme } from "@/utils/typeHelper"
import { isBase64 } from "@/utils/url/base64"

const message = createMessage()

export const goToURL = (params: { url: string; newTab?: boolean }) => {
  const { url = "", newTab = false } = params
  if (typeof url !== "string" || typeof newTab !== "boolean") return
  let finalURL = url
  if (!finalURL) return
  if (!isValidUrlScheme(finalURL)) {
    finalURL = `https://${finalURL}`
  }
  if (newTab) {
    window.open(finalURL, "_blank")
  } else {
    window.location.assign(finalURL)
  }
}

export const showNotification = (params: {
  type: NotificationType
  title?: string
  description?: string
  duration?: number
}) => {
  const {
    type = "info",
    title = "",
    description = "",
    duration = 4500,
  } = params
  if (typeof type !== "string" || typeof duration !== "number") return
  const notification = createNotification()
  notification.show({
    title: `${title}`,
    content: `${description}`,
    duration,
    type,
  })
}

export const copyToClipboard = (copiedValue: unknown) => {
  if (copiedValue === undefined || copiedValue === null || copiedValue === "") {
    message.info({
      content: i18n.t("empty_copied_tips"),
    })
    return
  }
  const memorySize = estimateMemoryUsage(copiedValue)
  if (LIMIT_MEMORY < memorySize) {
    message.info({
      content: i18n.t("editor.global.size_exceed", {
        current_size: memorySize,
        limit_size: LIMIT_MEMORY,
      }),
    })
    return
  }
  message.success({
    content: i18n.t("copied"),
  })
  if (typeof copiedValue === "string" || typeof copiedValue === "number") {
    copy(String(copiedValue))
    return
  }
  copy(JSON.stringify(copiedValue))
}

export const setRouter = (params: { pagePath: string; viewPath?: string }) => {
  const { pagePath, viewPath = "" } = params
  if (typeof pagePath !== "string" || typeof viewPath !== "string") return
  let finalPath = `/${pagePath}`
  finalPath = viewPath ? finalPath + `/${viewPath}` : finalPath
  const originPath = window.location.pathname
  const originPathArray = originPath.split("/")
  const isProductionMode = getIsILLAProductMode(store.getState())
  const rootNodeProps = getRootNodeExecutionResult(store.getState())
  const { pageSortedKey } = rootNodeProps
  const index = pageSortedKey.findIndex((path: string) => path === pagePath)
  if (index === -1) return
  if (isProductionMode && originPathArray.length >= 5) {
    ILLARoute.navigate(originPathArray.slice(0, 5).join("/") + finalPath, {
      replace: true,
    })
  }
  const updateSlice: UpdateExecutionByDisplayNamePayload[] = [
    {
      displayName: "root",
      value: {
        currentPageIndex: index,
      },
    },
  ]
  if (viewPath) {
    const canvas = getCanvas(store.getState())
    if (!canvas) return
    const pageNode = searchDsl(canvas, pagePath)
    if (!pageNode) return
    pageNode.childrenNode.forEach((node) => {
      const sectionViewConfigs = node.props?.sectionViewConfigs || []
      const viewSortedKey = node.props?.viewSortedKey || []
      const findConfig = sectionViewConfigs.find((config: SectionViewShape) => {
        return config.path === viewPath
      })
      if (findConfig) {
        const viewDisplayName = findConfig.viewDisplayName
        const indexOfViewKey = viewSortedKey.findIndex(
          (key: string) => key === viewDisplayName,
        )
        if (indexOfViewKey !== -1) {
          updateSlice.push({
            displayName: node.displayName,
            value: {
              currentViewIndex: indexOfViewKey,
            },
          })
        }
      }
    })
  }
  store.dispatch(
    executionActions.updateExecutionByMultiDisplayNameReducer(updateSlice),
  )
}

export const downloadFile = (params: {
  fileType: string
  fileName: string
  data: unknown
}) => {
  const { fileType = "auto", fileName = "Untitled File", data } = params
  if (
    typeof fileName !== "string" ||
    typeof fileType !== "string" ||
    data == undefined
  )
    return
  const message = createMessage()
  try {
    const fileDownloadName = getFileName((fileName ?? "").trim(), fileType)
    const contentType = getContentTypeByFileExtension(
      fileDownloadName.split(".")[1],
    )
    const isBase64Suffix = typeof data === "string" && isBase64(data)
    const isValidBase64 = typeof data === "string" && isBase64(data, true)
    const formatData = isArray(data) ? data : isObject(data) ? [data] : data
    const isValidUrl = typeof data === "string" && isBlobURLOrUrl(data)

    let formattedDownloadData: string | Blob | File | Uint8Array

    if (isValidBase64 || data instanceof Blob) {
      formattedDownloadData = data
    } else if (isBase64Suffix) {
      formattedDownloadData = `data:${contentType};base64,${data}`
    } else if (isValidUrl) {
      downloadFileFromURL(data, fileDownloadName, contentType)
      return
    } else {
      switch (contentType) {
        case "text/csv":
          {
            formattedDownloadData = new Blob(
              ["\ufeff", convertToCSV(formatData)],
              {
                type: "text/csv;charset=utf-8",
              },
            )
          }
          break
        case "application/vnd.ms-excel":
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          {
            formattedDownloadData = new Blob(
              [downloadExcelFile(data, contentType)],
              {
                type: "application/octet-stream",
              },
            )
          }
          break
        case "text/tab-separated-values":
          {
            formattedDownloadData = convertToTSV(formatData)
          }
          break
        default:
          {
            if (typeof data === "object") {
              formattedDownloadData = JSON.stringify(data)
            } else {
              formattedDownloadData = ""
            }
          }
          break
      }
    }
    download(formattedDownloadData, fileDownloadName, contentType)
  } catch (e) {
    message.error({
      content: i18n.t("editor.method.file_download.message.download_failed"),
    })
    console.error(e)
  }
}
