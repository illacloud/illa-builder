import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Select } from "@illa-design/react"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
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
  DownloadOneContentInitial,
  ListAllContentInitial,
  ReadOneContentInitial,
  S3Action,
  S3ActionList,
  S3ActionRequestType,
  S3ActionTypeContent,
  UploadContentInitial,
  UploadMultipleContentInitial,
} from "@/redux/currentApp/action/s3Action"
import { DeleteMultiplePart } from "./DeleteMultiplePart"
import { DeleteOnePart } from "./DeleteOnePart"
import { DownloadOnePart } from "./DownloadOnePart"
import { ListAllPart } from "./ListAllPart"
import { ReadOnePart } from "./ReadOnePart"
import { UploadMultiplePart } from "./UploadMultiplePart"
import { UploadPart } from "./UploadPart"
import {
  actionItemContainer,
  s3ContainerStyle,
  s3ItemLabelStyle,
  s3ItemStyle,
} from "./style"

export const S3Panel: FC = () => {
  const { t } = useTranslation()

  const cachedAction = useSelector(getCachedAction) as ActionItem<
    S3Action<S3ActionTypeContent>
  >
  const selectedAction = useSelector(getSelectedAction)!
  const dispatch = useDispatch()
  let content = cachedAction.content as S3Action<S3ActionTypeContent>

  const renderInputBody = useMemo(() => {
    switch (content.commands) {
      case S3ActionRequestType.LIST_ALL:
        return <ListAllPart commandArgs={content.commandArgs} />
      case S3ActionRequestType.READ_ONE:
        return <ReadOnePart commandArgs={content.commandArgs} />
      case S3ActionRequestType.DOWNLOAD_ONE:
        return <DownloadOnePart commandArgs={content.commandArgs} />
      case S3ActionRequestType.DELETE_ONE:
        return <DeleteOnePart commandArgs={content.commandArgs} />
      case S3ActionRequestType.DELETE_MULTIPLE:
        return <DeleteMultiplePart commandArgs={content.commandArgs} />
      case S3ActionRequestType.UPLOAD:
        return <UploadPart commandArgs={content.commandArgs} />
      case S3ActionRequestType.UPLOAD_MULTIPLE:
        return <UploadMultiplePart commandArgs={content.commandArgs} />
      default:
        return <></>
    }
  }, [content.commands, content.commandArgs])

  const handleActionChange = (value: S3ActionRequestType) => {
    let newCommandArgs: S3ActionTypeContent = ListAllContentInitial
    if (
      cachedAction.resourceId === selectedAction.resourceId &&
      (selectedAction.content as S3Action<S3ActionTypeContent>).commands ===
        value
    ) {
      newCommandArgs = (selectedAction.content as S3Action<S3ActionTypeContent>)
        .commandArgs
    } else {
      switch (value) {
        case S3ActionRequestType.LIST_ALL:
          newCommandArgs = ListAllContentInitial
          break
        case S3ActionRequestType.READ_ONE:
          newCommandArgs = ReadOneContentInitial
          break
        case S3ActionRequestType.DOWNLOAD_ONE:
          newCommandArgs = DownloadOneContentInitial
          break
        case S3ActionRequestType.DELETE_ONE:
          newCommandArgs = DeleteOneContentInitial
          break
        case S3ActionRequestType.DELETE_MULTIPLE:
          newCommandArgs = DeleteMultipleContentInitial
          break
        case S3ActionRequestType.UPLOAD:
          newCommandArgs = UploadContentInitial
          break
        case S3ActionRequestType.UPLOAD_MULTIPLE:
          newCommandArgs = UploadMultipleContentInitial
          break
      }
    }
    dispatch(
      configActions.updateCachedAction({
        ...cachedAction,
        content: {
          ...cachedAction.content,
          commands: value,
          commandArgs: newCommandArgs,
        },
      }),
    )
  }

  return (
    <div css={s3ContainerStyle}>
      <ResourceChoose />
      <div css={actionItemContainer}>
        <div css={s3ItemStyle}>
          <span css={s3ItemLabelStyle}>
            {t("editor.action.panel.s3.action_type")}
          </span>
          <Select
            colorScheme="techPurple"
            showSearch={true}
            defaultValue={content.commands}
            value={content.commands}
            ml="16px"
            w="100%"
            onChange={(v) => {
              handleActionChange(v as S3ActionRequestType)
            }}
            options={S3ActionList}
          />
        </div>
        {renderInputBody}
        <TransformerComponent />
      </div>
      <ActionEventHandler />
    </div>
  )
}

S3Panel.displayName = "S3Panel"
