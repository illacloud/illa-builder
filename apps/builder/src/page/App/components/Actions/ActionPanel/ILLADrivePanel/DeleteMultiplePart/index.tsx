import { ILLADriveDeleteMultipleContent } from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { ILLADriveActionPartProps } from "../interface"

export const DeleteMultiplePart: FC<ILLADriveActionPartProps> = (props) => {
  const { t } = useTranslation()
  const commandArgs = props.commandArgs as ILLADriveDeleteMultipleContent
  const { handleOptionsValueChange } = props

  return (
    <>
      <InputEditor
        title={t("editor.action.panel.label.drive.file_ids")}
        tips={t("editor.action.panel.label.tips.drive.file_ids")}
        placeholder={t("editor.action.panel.label.placeholder.drive.file_ids")}
        lineNumbers
        mode={CODE_LANG.JAVASCRIPT}
        value={commandArgs.fileIDs}
        onChange={(value) => handleOptionsValueChange("fileIDs", value)}
        expectedType={VALIDATION_TYPES.ARRAY}
      />
    </>
  )
}

DeleteMultiplePart.displayName = "DeleteMultiplePart"
