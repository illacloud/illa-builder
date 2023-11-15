import { FC } from "react"
import { useTranslation } from "react-i18next"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import {
  FileTypeOptions,
  UploadOneContent,
} from "@/redux/currentApp/action/illaDriveAction"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { SingleTypeComponent } from "../../SingleTypeComponent"
import FolderSelect from "../components/FolderSelect"
import { ILLADriveActionPartProps } from "../interface"

export const UploadPart: FC<ILLADriveActionPartProps> = (props) => {
  const { t } = useTranslation()
  const commandArgs = props.commandArgs as UploadOneContent
  const { handleOptionsValueChange } = props

  return (
    <>
      <SingleTypeComponent
        title={t("editor.action.panel.label.drive.overwrite")}
        tips={t("editor.action.panel.label.tips.drive.overwrite")}
        value={commandArgs.overwriteDuplicate}
        componentType="switch"
        onChange={(value) =>
          handleOptionsValueChange("overwriteDuplicate", value)
        }
      />
      <InputEditor
        title={t("editor.inspect.setter_label.file_download.file_name")}
        tips={t("editor.inspect.setter_tips.file_download.file_name")}
        placeholder={t(
          "editor.inspect.setter.placeholder.file_download.file_name",
        )}
        mode={CODE_LANG.JAVASCRIPT}
        value={commandArgs.fileName}
        onChange={(value) => handleOptionsValueChange("fileName", value)}
        expectedType={VALIDATION_TYPES.STRING}
      />
      <InputEditor
        title={t("editor.inspect.setter_label.drive_builder.fileData")}
        tips={t("editor.inspect.setter_tips.drive_builder.fileData")}
        placeholder={t(
          "editor.inspect.setter.placeholder.drive_builder.fileData",
        )}
        mode={CODE_LANG.JAVASCRIPT}
        value={commandArgs.fileData}
        onChange={(value) => handleOptionsValueChange("fileData", value)}
        expectedType={VALIDATION_TYPES.STRING}
      />
      <SingleTypeComponent
        title={t("editor.inspect.setter_label.file_download.file_type")}
        tips={t("editor.inspect.setter_tips.file_download.file_type")}
        value={commandArgs.fileType}
        onChange={(value) => handleOptionsValueChange("fileType", value)}
        componentType="select"
        options={FileTypeOptions}
      />
      <FolderSelect value={commandArgs.path} />
    </>
  )
}

UploadPart.displayName = "UploadPart"
