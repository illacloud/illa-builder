import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3"
import { FC, useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
  Button,
  CaretRightIcon,
  DropList,
  Dropdown,
  MoreIcon,
  globalColor,
  illaPrefix,
  useMessage,
} from "@illa-design/react"
import { Api } from "@/api/base"
import { EditableText } from "@/components/EditableText"
import i18n from "@/i18n/config"
import {
  getFileValue,
  isFileOversize,
} from "@/page/App/components/Actions/ActionPanel/utils/calculateFileSize"
import {
  downloadActionResult,
  isValidBase64,
  runAction,
} from "@/page/App/components/Actions/ActionPanel/utils/runAction"
import {
  onCopyActionItem,
  onDeleteActionItem,
} from "@/page/App/components/Actions/api"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import {
  BodyContentType,
  ElasticSearchAction,
  IDEditorType,
  QueryContentType,
} from "@/redux/currentApp/action/elasticSearchAction"
import {
  ReadOneContent,
  S3Action,
  S3ActionRequestType,
  S3ActionTypeContent,
  UploadContent,
  UploadMultipleContent,
} from "@/redux/currentApp/action/s3Action"
import { SMPTAction } from "@/redux/currentApp/action/smtpAction"
import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { S3Resource } from "@/redux/resource/s3Resource"
import { ActionTitleBarProps } from "./interface"
import {
  actionTitleBarSpaceStyle,
  actionTitleBarStyle,
  editableTitleBarWrapperStyle,
} from "./style"

const Item = DropList.Item
export type RunMode = "save" | "run" | "save_and_run"
const FILE_SIZE_LIMIT_TYPE = ["s3", "smtp"]
const ClientS3 = [
  S3ActionRequestType.READ_ONE,
  S3ActionRequestType.DOWNLOAD_ONE,
  S3ActionRequestType.UPLOAD,
  S3ActionRequestType.UPLOAD_MULTIPLE,
]

const getCanRunAction = (cachedAction: ActionItem<ActionContent> | null) => {
  if (
    !cachedAction ||
    !FILE_SIZE_LIMIT_TYPE.includes(cachedAction.actionType)
  ) {
    return [true, ""]
  }
  switch (cachedAction.actionType) {
    case "smtp":
      const smtpContent = cachedAction.content as SMPTAction
      return [
        !isFileOversize(smtpContent?.attachment || "", "smtp"),
        i18n.t("editor.action.panel.error.max_file"),
      ]
  }
  return [true, ""]
}

const getActionFilteredContent = (cachedAction: ActionItem<ActionContent>) => {
  let cachedActionValue: ActionItem<ActionContent> | null = cachedAction
  if (!cachedActionValue) {
    return cachedActionValue
  }
  switch (cachedAction?.actionType) {
    case "elasticsearch":
      let content = cachedAction.content as ElasticSearchAction
      if (!IDEditorType.includes(content.operation)) {
        const { id = "", ...otherContent } = content
        cachedActionValue = {
          ...cachedAction,
          content: { ...otherContent },
        }
        content = otherContent
      }
      if (!BodyContentType.includes(content.operation)) {
        const { body = "", ...otherContent } = content
        cachedActionValue = {
          ...cachedActionValue,
          content: { ...otherContent },
        }
        content = otherContent
      }
      if (!QueryContentType.includes(content.operation)) {
        const { query = "", ...otherContent } = content
        cachedActionValue = {
          ...cachedActionValue,
          content: { ...otherContent },
        }
      }
      break
    case "smtp":
      const smtpContent = cachedAction.content as SMPTAction
      const { to, cc, bcc, attachment, ...otherContent } = smtpContent
      cachedActionValue = {
        ...cachedAction,
        content: {
          ...otherContent,
          ...(to && { to }),
          ...(cc && { cc }),
          ...(bcc && { bcc }),
          ...(attachment && { attachment }),
        },
      }
      break
  }
  return cachedActionValue
}

export const ActionTitleBar: FC<ActionTitleBarProps> = (props) => {
  const { onActionRun } = props

  const message = useMessage()
  const selectedAction = useSelector(getSelectedAction)!
  const cachedAction = useSelector(getCachedAction)!
  const resourceList = useSelector(getAllResources)

  const currentSelectResource = resourceList.find(
    (r) => r.resourceId === cachedAction.resourceId,
  )
  const isChanged =
    JSON.stringify(selectedAction) !== JSON.stringify(cachedAction)
  const currentApp = useSelector(getAppInfo)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [canRunAction, canNotRunMessage] = getCanRunAction(cachedAction)

  let runMode: RunMode = useMemo(() => {
    if (cachedAction != undefined && isChanged) {
      if (cachedAction.triggerMode === "manually") {
        return "save"
      } else if (cachedAction.triggerMode === "automate") {
        return "save_and_run"
      } else {
        return "save"
      }
    } else {
      return "run"
    }
  }, [isChanged, cachedAction])

  function base64ToArrayBuffer(base64: string) {
    let binary_string = window.atob(base64)
    let len = binary_string.length
    let bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i)
    }
    return bytes
  }

  const fromCharCode = String.fromCharCode
  const encode = (uint8array: Uint8Array) => {
    const output = []
    for (let i = 0, length = uint8array.length; i < length; i++) {
      output.push(fromCharCode(uint8array[i]))
    }
    return btoa(output.join(""))
  }

  const handleS3Action = useCallback(
    async (cachedActionValue: ActionItem<ActionContent>) => {
      if (!currentSelectResource) {
        return
      }
      const content = cachedActionValue.content as S3Action<S3ActionTypeContent>
      const { commands } = content
      const { accessKeyID, secretAccessKey, region, bucketName } =
        currentSelectResource.content as S3Resource
      const s3Client = new S3Client({
        region,
        credentials: {
          accessKeyId: accessKeyID,
          secretAccessKey,
        },
      })
      try {
        if (
          commands === S3ActionRequestType.READ_ONE ||
          commands === S3ActionRequestType.DOWNLOAD_ONE
        ) {
          let commandArgs = content.commandArgs as ReadOneContent
          const res = await s3Client.send(
            new GetObjectCommand({
              Bucket: bucketName,
              Key: commandArgs.objectKey,
            }),
          )

          const stringValue = encode(
            (await res?.Body?.transformToByteArray()) || new Uint8Array(),
          )
          if (commands === S3ActionRequestType.DOWNLOAD_ONE) {
            downloadActionResult(
              res.ContentType || "",
              commandArgs.objectKey,
              stringValue || "",
            )
          }
          onActionRun({
            result: stringValue || "",
          })
        } else if (commands === S3ActionRequestType.UPLOAD) {
          let commandArgs = content.commandArgs as UploadContent
          const res = await s3Client.send(
            new PutObjectCommand({
              Bucket: bucketName,
              Key: commandArgs.objectKey,
              Body: isValidBase64.test(commandArgs.objectData)
                ? base64ToArrayBuffer(commandArgs.objectData)
                : commandArgs.objectData,
              ...(commandArgs.contentType && {
                ContentType: commandArgs.contentType,
              }),
            }),
          )
          onActionRun({
            result: res,
          })
        } else if (commands === S3ActionRequestType.UPLOAD_MULTIPLE) {
          let commandArgs = content.commandArgs as UploadMultipleContent
          const { objectDataList, objectKeyList } = commandArgs
          const realObjectDataList = getFileValue(objectDataList)
          const realObjectKeyList = getFileValue(objectKeyList)
          const errorList = []
          let successCount = 0
          for (let i = 0, len = realObjectDataList.length; i < len; i++) {
            try {
              await s3Client.send(
                new PutObjectCommand({
                  Bucket: bucketName,
                  Key: realObjectKeyList[i],
                  Body: isValidBase64.test(realObjectDataList[i])
                    ? base64ToArrayBuffer(realObjectDataList[i])
                    : realObjectDataList[i],
                  ...(commandArgs.contentType && {
                    ContentType: commandArgs.contentType,
                  }),
                }),
              )
              successCount++
            } catch (e) {
              errorList.push(e)
            }
          }
          onActionRun({
            result: `Total: ${
              realObjectDataList.length
            }, Success: ${successCount}, Filed: ${errorList || ""}`,
          })
        }
      } catch (e) {
        onActionRun(
          {
            errorMessage:
              e +
              " check: https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/cors.html",
          },
          true,
        )
      } finally {
        setLoading(false)
      }
    },
    [currentSelectResource],
  )

  const handleActionOperation = useCallback(() => {
    let cachedActionValue: ActionItem<ActionContent> =
      getActionFilteredContent(cachedAction)

    const isClientS3 =
      cachedActionValue.actionType === "s3" &&
      ClientS3.includes(
        (cachedActionValue.content as S3Action<S3ActionTypeContent>).commands,
      )

    switch (runMode) {
      case "run":
        if (!canRunAction) {
          message.error({
            content: canNotRunMessage,
          })
          return
        }
        setLoading(true)
        if (cachedActionValue) {
          if (isClientS3) {
            handleS3Action(cachedActionValue)
            return
          }
          runAction(cachedActionValue, (result: unknown, error?: boolean) => {
            setLoading(false)
            onActionRun(result, error)
          })
        }
        break
      case "save":
        Api.request(
          {
            method: "PUT",
            url: `/apps/${currentApp.appId}/actions/${selectedAction.actionId}`,
            data: cachedActionValue,
          },
          () => {
            if (cachedActionValue) {
              dispatch(actionActions.updateActionItemReducer(cachedActionValue))
            }
          },
          () => {
            message.error({
              content: t("create_fail"),
            })
          },
          () => {
            message.error({
              content: t("create_fail"),
            })
          },
          (l) => {
            setLoading(l)
          },
        )
        break
      case "save_and_run":
        if (!canRunAction) {
          message.error({
            content: canNotRunMessage,
          })
          return
        }
        Api.request(
          {
            method: "PUT",
            url: `/apps/${currentApp.appId}/actions/${selectedAction.actionId}`,
            data: cachedActionValue,
          },
          () => {
            if (cachedActionValue) {
              dispatch(actionActions.updateActionItemReducer(cachedActionValue))
              setLoading(true)

              if (isClientS3) {
                handleS3Action(cachedActionValue)
                return
              }
              runAction(
                cachedActionValue,
                (result: unknown, error?: boolean) => {
                  setLoading(false)
                  onActionRun(result, error)
                },
              )
            }
          },
          () => {
            message.error({
              content: t("editor.action.panel.btn.save_fail"),
            })
          },
          () => {
            message.error({
              content: t("editor.action.panel.btn.save_fail"),
            })
          },
          (l) => {
            setLoading(l)
          },
        )
        break
    }
  }, [
    cachedAction,
    runMode,
    canRunAction,
    currentApp.appId,
    selectedAction?.actionId,
    t,
    onActionRun,
    dispatch,
    message,
  ])

  const renderButton = useMemo(() => {
    return runMode === "run" ? cachedAction?.actionType !== "transformer" : true
  }, [cachedAction?.actionType, runMode])

  if (selectedAction == undefined || cachedAction === undefined) {
    return <></>
  }

  return (
    <div css={actionTitleBarStyle}>
      <div css={editableTitleBarWrapperStyle}>
        <EditableText
          key={selectedAction.displayName}
          displayName={selectedAction.displayName}
          updateDisplayNameByBlur={(value) => {
            const newAction = {
              ...selectedAction,
              displayName: value,
            }
            Api.request(
              {
                method: "PUT",
                url: `/apps/${currentApp.appId}/actions/${selectedAction.actionId}`,
                data: newAction,
              },
              () => {
                dispatch(actionActions.updateActionItemReducer(newAction))
              },
              () => {
                message.error({
                  content: t("change_fail"),
                })
              },
              () => {
                message.error({
                  content: t("change_fail"),
                })
              },
              (l) => {
                setLoading(l)
              },
            )
          }}
        />
      </div>
      <div css={actionTitleBarSpaceStyle} />
      <Dropdown
        position="bottom-end"
        trigger="click"
        dropList={
          <DropList width={"184px"}>
            <Item
              key={"duplicate"}
              title={t("editor.action.action_list.contextMenu.duplicate")}
              onClick={() => {
                onCopyActionItem(selectedAction)
              }}
            />
            <Item
              key={"delete"}
              title={t("editor.action.action_list.contextMenu.delete")}
              fontColor={globalColor(`--${illaPrefix}-red-03`)}
              onClick={() => {
                onDeleteActionItem(selectedAction)
              }}
            />
          </DropList>
        }
      >
        <Button colorScheme="grayBlue" leftIcon={<MoreIcon size="14px" />} />
      </Dropdown>
      {renderButton && (
        <Button
          ml="8px"
          colorScheme="techPurple"
          variant={isChanged ? "fill" : "light"}
          size="medium"
          loading={loading}
          leftIcon={<CaretRightIcon />}
          onClick={handleActionOperation}
        >
          {t(`editor.action.panel.btn.${runMode}`)}
        </Button>
      )}
    </div>
  )
}

ActionTitleBar.displayName = "ActionTitleBar"
