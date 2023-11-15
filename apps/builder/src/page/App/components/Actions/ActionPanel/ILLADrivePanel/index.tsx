import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Space } from "@illa-design/react"
import FolderOperateModal from "@/components/FolderOperateModal"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import {
  DeleteMultipleContentInitial,
  DeleteOneContentInitial,
  DownloadMultipleContentInitial,
  DownloadOneContentInitial,
  ILLADriveAction,
  ILLADriveActionList,
  ILLADriveActionTypeContent,
  ILLA_DRIVE_ACTION_REQUEST_TYPE,
  ListAllContentInitial,
  UpdateContentInitial,
  UploadMultipleContentInitial,
  UploadOneContentInitial,
} from "@/redux/currentApp/action/illaDriveAction"
import TriggerModeChoose from "../PanelHeader/TriggerModeChoose"
import { PathSelectProvider } from "./provider"
import {
  actionItemContainer,
  containerStyle,
  spaceStyle,
  titleStyle,
  triggerModeContainerStyle,
} from "./style"
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
    let newCommandArgs: ILLADriveActionTypeContent = ListAllContentInitial
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
          newCommandArgs = ListAllContentInitial
          break
        case ILLA_DRIVE_ACTION_REQUEST_TYPE.DOWNLOAD_ONE:
          newCommandArgs = DownloadOneContentInitial
          break
        case ILLA_DRIVE_ACTION_REQUEST_TYPE.DOWNLOAD_MULTIPLE:
          newCommandArgs = DownloadMultipleContentInitial
          break
        case ILLA_DRIVE_ACTION_REQUEST_TYPE.DELETE_ONE:
          newCommandArgs = DeleteOneContentInitial
          break
        case ILLA_DRIVE_ACTION_REQUEST_TYPE.DELETE_MULTIPLE:
          newCommandArgs = DeleteMultipleContentInitial
          break
        case ILLA_DRIVE_ACTION_REQUEST_TYPE.UPLOAD:
          newCommandArgs = UploadOneContentInitial
          break
        case ILLA_DRIVE_ACTION_REQUEST_TYPE.UPLOAD_MULTIPLE:
          newCommandArgs = UploadMultipleContentInitial
        case ILLA_DRIVE_ACTION_REQUEST_TYPE.UPDATE:
          newCommandArgs = UpdateContentInitial
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

  return (
    <PathSelectProvider handleOptionsValueChange={handleOptionsValueChange}>
      <div css={containerStyle}>
        <div css={triggerModeContainerStyle}>
          <span css={titleStyle}>
            {t("editor.action.panel.option.trigger.label")}
          </span>
          <TriggerModeChoose />
        </div>
        <Space w="100%" h="8px" css={spaceStyle} disp="block" />
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
        <ActionEventHandler />
      </div>
      <FolderOperateModal />
    </PathSelectProvider>
  )
}

ILLADrivePanel.displayName = "ILLADrivePanel"
export default ILLADrivePanel
