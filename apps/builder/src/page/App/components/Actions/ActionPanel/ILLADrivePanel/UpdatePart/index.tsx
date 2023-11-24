import { ILLADriveUpdateContent } from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { ILLADriveActionPartProps } from "../interface"

export const UpdatePart: FC<ILLADriveActionPartProps> = (props) => {
  const { t } = useTranslation()
  const commandArgs = props.commandArgs as ILLADriveUpdateContent
  const { handleOptionsValueChange } = props

  return (
    <>
      <InputEditor
        title={t("editor.action.panel.label.drive.file_id")}
        tips={t("editor.action.panel.label.tips.drive.file_id")}
        placeholder={t("editor.action.panel.label.placeholder.drive.file_id")}
        lineNumbers
        mode={CODE_LANG.JAVASCRIPT}
        value={commandArgs.fileID}
        onChange={(value) => handleOptionsValueChange("fileID", value)}
        expectedType={VALIDATION_TYPES.STRING}
      />

      <InputEditor
        title={t("editor.action.panel.label.drive.target_file_name")}
        tips={t("editor.action.panel.label.tips.drive.target_file_name")}
        placeholder={t(
          "editor.action.panel.label.placeholder.drive.target_file_name",
        )}
        lineNumbers
        mode={CODE_LANG.JAVASCRIPT}
        value={commandArgs.fileName}
        onChange={(value) => handleOptionsValueChange("fileName", value)}
        expectedType={VALIDATION_TYPES.STRING}
      />
    </>
  )
}

UpdatePart.displayName = "UpdatePart"
