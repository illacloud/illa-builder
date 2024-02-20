import {
  ILLADriveAction,
  ILLADriveActionTypeContent,
  ILLA_DRIVE_ACTION_REQUEST_TYPE,
} from "@illa-public/public-types"
import { DeleteMultiplePart } from "./DeleteMultiplePart"
import { DeleteOnePart } from "./DeleteOnePart"
import { DownloadMultiplePart } from "./DownloadMultiplePart"
import { DownloadOnePart } from "./DownloadOnePart"
import { ListAllPart } from "./ListAllPart"
import { ListFolders } from "./ListFolders"
import { UpdatePart } from "./UpdatePart"
import { UploadMultiplePart } from "./UploadMultiplePart"
import { UploadPart } from "./UploadPart"

export const getInputBody = (
  content: ILLADriveAction<ILLADriveActionTypeContent>,
  handleOptionsValueChange: (name: string, value: string | boolean) => void,
) => {
  switch (content.operation) {
    case ILLA_DRIVE_ACTION_REQUEST_TYPE.LIST:
      return (
        <ListAllPart
          handleOptionsValueChange={handleOptionsValueChange}
          commandArgs={content.commandArgs}
        />
      )
    case ILLA_DRIVE_ACTION_REQUEST_TYPE.LIST_FOLDERS:
      return (
        <ListFolders
          handleOptionsValueChange={handleOptionsValueChange}
          commandArgs={content.commandArgs}
        />
      )
    case ILLA_DRIVE_ACTION_REQUEST_TYPE.DOWNLOAD_ONE:
      return (
        <DownloadOnePart
          handleOptionsValueChange={handleOptionsValueChange}
          commandArgs={content.commandArgs}
        />
      )
    case ILLA_DRIVE_ACTION_REQUEST_TYPE.DOWNLOAD_MULTIPLE:
      return (
        <DownloadMultiplePart
          commandArgs={content.commandArgs}
          handleOptionsValueChange={handleOptionsValueChange}
        />
      )
    case ILLA_DRIVE_ACTION_REQUEST_TYPE.DELETE_ONE:
      return (
        <DeleteOnePart
          handleOptionsValueChange={handleOptionsValueChange}
          commandArgs={content.commandArgs}
        />
      )
    case ILLA_DRIVE_ACTION_REQUEST_TYPE.DELETE_MULTIPLE:
      return (
        <DeleteMultiplePart
          commandArgs={content.commandArgs}
          handleOptionsValueChange={handleOptionsValueChange}
        />
      )
    case ILLA_DRIVE_ACTION_REQUEST_TYPE.UPLOAD:
      return (
        <UploadPart
          handleOptionsValueChange={handleOptionsValueChange}
          commandArgs={content.commandArgs}
        />
      )
    case ILLA_DRIVE_ACTION_REQUEST_TYPE.UPLOAD_MULTIPLE:
      return (
        <UploadMultiplePart
          commandArgs={content.commandArgs}
          handleOptionsValueChange={handleOptionsValueChange}
        />
      )
    case ILLA_DRIVE_ACTION_REQUEST_TYPE.UPDATE:
      return (
        <UpdatePart
          handleOptionsValueChange={handleOptionsValueChange}
          commandArgs={content.commandArgs}
        />
      )
    default:
      return <></>
  }
}
