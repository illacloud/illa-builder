import {
  ILLADriveListFoldersContent,
  ILLA_DRIVE_FILTER_TYPE,
} from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { ILLADriveActionPartProps } from "@/page/App/components/Actions/ActionPanel/ILLADrivePanel/interface"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import FolderSelect from "../components/FolderSelect"
import SortOperate from "../components/SortOperate"

export const ListFolders: FC<ILLADriveActionPartProps> = (props) => {
  const { t } = useTranslation()
  const commandArgs = props.commandArgs as ILLADriveListFoldersContent
  const { handleOptionsValueChange } = props
  const filterType = commandArgs.filterType

  const sortByeOptions = [
    "id",
    "lastModifiedAt",
    "lastModifiedBy",
    "name",
    "fileNum",
    "folderNum",
  ]

  const FilterTypeOption = [
    {
      label: t("editor.action.panel.label.option.drive.file_type.none"),
      value: ILLA_DRIVE_FILTER_TYPE.NONE,
    },
    {
      label: t("editor.action.panel.label.option.drive.file_type.by_id"),
      value: ILLA_DRIVE_FILTER_TYPE.BY_ID,
    },
    {
      label: t("editor.action.panel.label.option.drive.file_type.by_name"),
      value: ILLA_DRIVE_FILTER_TYPE.BY_NAME,
    },
  ]

  return (
    <>
      <SingleTypeComponent
        title={t("editor.action.panel.label.drive.filter_type")}
        tips={t("editor.action.panel.label.tips.drive.filter_type")}
        value={commandArgs.filterType}
        componentType="select"
        type="button"
        forceEqualWidth={true}
        onChange={(value) => handleOptionsValueChange("filterType", value)}
        options={FilterTypeOption}
      />
      {filterType === ILLA_DRIVE_FILTER_TYPE.BY_ID && (
        <InputEditor
          title={t("editor.action.panel.label.drive.folder_name")}
          tips={t("editor.action.panel.label.tips.drive.folder_name")}
          lineNumbers
          mode={CODE_LANG.JAVASCRIPT}
          value={commandArgs.folderID}
          onChange={(value) => handleOptionsValueChange("fileID", value)}
          expectedType={VALIDATION_TYPES.STRING}
        />
      )}
      {filterType === ILLA_DRIVE_FILTER_TYPE.BY_NAME && (
        <InputEditor
          title={t("editor.action.panel.label.drive.file_name")}
          tips={t("editor.action.panel.label.tips.drive.file_name")}
          placeholder={t(
            "editor.action.panel.label.placeholder.drive.file_name",
          )}
          lineNumbers
          mode={CODE_LANG.JAVASCRIPT}
          value={commandArgs.search}
          onChange={(value) => handleOptionsValueChange("search", value)}
          expectedType={VALIDATION_TYPES.STRING}
        />
      )}
      <FolderSelect value={commandArgs.path} />
      <InputEditor
        title={t("editor.action.panel.label.drive.limit")}
        tips={t("editor.action.panel.label.tips.drive.limit")}
        placeholder={t("editor.action.panel.label.placeholder.drive.limit")}
        lineNumbers
        mode={CODE_LANG.JAVASCRIPT}
        value={commandArgs.limit}
        onChange={(value) => handleOptionsValueChange("limit", value)}
        expectedType={VALIDATION_TYPES.NUMBER}
      />
      <InputEditor
        title={t("editor.action.panel.label.drive.page")}
        tips={t("editor.action.panel.label.tips.drive.page")}
        placeholder={t("editor.action.panel.label.placeholder.drive.page")}
        lineNumbers
        mode={CODE_LANG.JAVASCRIPT}
        value={commandArgs.page}
        onChange={(value) => handleOptionsValueChange("page", value)}
        expectedType={VALIDATION_TYPES.NUMBER}
      />
      <SortOperate
        sortByeOptions={sortByeOptions}
        commandArgs={commandArgs}
        handleOptionsValueChange={handleOptionsValueChange}
      />
    </>
  )
}

ListFolders.displayName = "ListFolders"
