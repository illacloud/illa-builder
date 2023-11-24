import { FC, useContext } from "react"
import { useTranslation } from "react-i18next"
import Folder from "@/assets/drive/panelFolder.svg?react"
import { CodeEditor } from "@/components/CodeEditor"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { FolderOperateModalContext } from "@/components/FolderOperateModal/context"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { PathSelectContext } from "../../provider"
import {
  actionItemCodeEditorStyle,
  actionItemTip,
  fileSelectContainerStyle,
  folderIconStyle,
  folderSelectStyle,
  headerStyle,
  inputContainerStyle,
  nameStyle,
} from "./style"

interface FolderSelectProps {
  value: string
}

const FolderSelect: FC<FolderSelectProps> = ({ value }) => {
  const { t } = useTranslation()
  const { setFolderOperateVisible } = useContext(FolderOperateModalContext)
  const { handleOptionsValueChange } = useContext(PathSelectContext)
  return (
    <div css={folderSelectStyle}>
      <div css={headerStyle}>
        <span css={nameStyle}>
          {t("editor.action.panel.label.drive.folder")}
        </span>
        <div
          css={fileSelectContainerStyle}
          onClick={() => setFolderOperateVisible(true)}
        >
          <span css={folderIconStyle}>
            <Folder />
          </span>
          <span>{t("drive.upload.select.select_entry")}</span>
        </div>
      </div>
      <div css={inputContainerStyle}>
        <CodeEditor
          singleLine
          wrapperCss={actionItemCodeEditorStyle}
          lang={CODE_LANG.JAVASCRIPT}
          value={value}
          onChange={(value) => handleOptionsValueChange("path", value)}
          expectValueType={VALIDATION_TYPES.STRING}
          modalTitle={t("editor.action.panel.label.drive.folder")}
        />
        <div css={actionItemTip}>
          <span>{t("editor.action.panel.label.tips.drive.folder")}</span>
        </div>
      </div>
    </div>
  )
}

export default FolderSelect
