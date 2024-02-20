import {
  ILLADriveDeleteMultipleContentInitial,
  ILLADriveDeleteOneContentInitial,
  ILLADriveDownloadMultipleContentInitial,
  ILLADriveDownloadOneContentInitial,
  ILLADriveListAllContentInitial,
  ILLADriveListFoldersContentInitial,
  ILLADriveUpdateContentInitial,
  ILLADriveUploadMultipleContentInitial,
  ILLADriveUploadOneContentInitial,
} from "@illa-public/public-configs"
import {
  ActionItem,
  ILLADriveAction,
  ILLADriveActionTypeContent,
  ILLA_DRIVE_ACTION_REQUEST_TYPE,
} from "@illa-public/public-types"
import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import FolderOperateModal from "@/components/FolderOperateModal"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { PathSelectProvider } from "./provider"
import { actionItemContainer } from "./style"
import { getInputBody } from "./utils"

const ILLADrivePanel: FC = () => {
  const { t } = useTranslation()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    ILLADriveAction<ILLADriveActionTypeContent>
  >
  const selectedAction = useSelector(getSelectedAction)!
  const dispatch = useDispatch()
  let content =
    cachedAction.content as ILLADriveAction<ILLADriveActionTypeContent>

  const handleOptionsValueChange = useCallback(
    (name: string, value: string | boolean) => {
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...cachedAction.content,
            commandArgs: {
              ...cachedAction.content.commandArgs,
              [name]: value,
            },
          },
        }),
      )
    },
    [cachedAction, dispatch],
  )

  const renderInputBody = getInputBody(content, handleOptionsValueChange)

  const handleActionChange = (value: ILLA_DRIVE_ACTION_REQUEST_TYPE) => {
    let newCommandArgs: ILLADriveActionTypeContent =
      ILLADriveListAllContentInitial
    if (
      cachedAction.resourceID === selectedAction.resourceID &&
      (selectedAction.content as ILLADriveAction<ILLADriveActionTypeContent>)
        .operation === value
    ) {
      newCommandArgs = (
        selectedAction.content as ILLADriveAction<ILLADriveActionTypeContent>
      ).commandArgs
    } else {
      switch (value) {
        case ILLA_DRIVE_ACTION_REQUEST_TYPE.LIST:
          newCommandArgs = ILLADriveListAllContentInitial
          break
        case ILLA_DRIVE_ACTION_REQUEST_TYPE.LIST_FOLDERS:
          newCommandArgs = ILLADriveListFoldersContentInitial
          break
        case ILLA_DRIVE_ACTION_REQUEST_TYPE.DOWNLOAD_ONE:
          newCommandArgs = ILLADriveDownloadOneContentInitial
          break
        case ILLA_DRIVE_ACTION_REQUEST_TYPE.DOWNLOAD_MULTIPLE:
          newCommandArgs = ILLADriveDownloadMultipleContentInitial
          break
        case ILLA_DRIVE_ACTION_REQUEST_TYPE.DELETE_ONE:
          newCommandArgs = ILLADriveDeleteOneContentInitial
          break
        case ILLA_DRIVE_ACTION_REQUEST_TYPE.DELETE_MULTIPLE:
          newCommandArgs = ILLADriveDeleteMultipleContentInitial
          break
        case ILLA_DRIVE_ACTION_REQUEST_TYPE.UPLOAD:
          newCommandArgs = ILLADriveUploadOneContentInitial
          break
        case ILLA_DRIVE_ACTION_REQUEST_TYPE.UPLOAD_MULTIPLE:
          newCommandArgs = ILLADriveUploadMultipleContentInitial
        case ILLA_DRIVE_ACTION_REQUEST_TYPE.UPDATE:
          newCommandArgs = ILLADriveUpdateContentInitial
          break
      }
    }
    dispatch(
      configActions.updateCachedAction({
        ...cachedAction,
        content: {
          ...cachedAction.content,
          operation: value,
          commandArgs: newCommandArgs,
        },
      }),
    )
  }

  const ILLADriveActionList = [
    {
      label: t("editor.action.panel.label.option.drive.method.list"),
      value: ILLA_DRIVE_ACTION_REQUEST_TYPE.LIST,
    },
    // not support yet
    // {
    //   label: t("editor.action.panel.label.option.drive.method.list_folders"),
    //   value: ILLA_DRIVE_ACTION_REQUEST_TYPE.LIST_FOLDERS,
    // }
    {
      label: t("editor.action.panel.label.option.drive.method.download"),
      value: ILLA_DRIVE_ACTION_REQUEST_TYPE.DOWNLOAD_ONE,
    },
    {
      label: t(
        "editor.action.panel.label.option.drive.method.download_multi_file",
      ),
      value: ILLA_DRIVE_ACTION_REQUEST_TYPE.DOWNLOAD_MULTIPLE,
    },
    {
      label: t("editor.action.panel.label.option.drive.method.delete"),
      value: ILLA_DRIVE_ACTION_REQUEST_TYPE.DELETE_ONE,
    },
    {
      label: t(
        "editor.action.panel.label.option.drive.method.delete_multi_file",
      ),
      value: ILLA_DRIVE_ACTION_REQUEST_TYPE.DELETE_MULTIPLE,
    },
    {
      label: t("editor.action.panel.label.option.drive.method.upload_file"),
      value: ILLA_DRIVE_ACTION_REQUEST_TYPE.UPLOAD,
    },
    {
      label: t(
        "editor.action.panel.label.option.drive.method.upload_multi_file",
      ),
      value: ILLA_DRIVE_ACTION_REQUEST_TYPE.UPLOAD_MULTIPLE,
    },
    {
      label: t("editor.action.panel.label.option.drive.method.update"),
      value: ILLA_DRIVE_ACTION_REQUEST_TYPE.UPDATE,
    },
  ]

  return (
    <PathSelectProvider handleOptionsValueChange={handleOptionsValueChange}>
      <div css={actionItemContainer}>
        <SingleTypeComponent
          title={t("editor.action.panel.label.drive.method")}
          tips={t("editor.action.panel.label.tips.drive.method")}
          componentType="select"
          value={content.operation}
          showSearch
          onChange={handleActionChange}
          options={ILLADriveActionList}
        />
        {renderInputBody}
        <TransformerComponent />
      </div>
      <FolderOperateModal />
    </PathSelectProvider>
  )
}

ILLADrivePanel.displayName = "ILLADrivePanel"
export default ILLADrivePanel
