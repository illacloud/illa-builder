import { FC } from "react"
import { useTranslation } from "react-i18next"
import { ReactComponent as FolderIcon } from "@/assets/drive/folder.svg"
import { emptyContainerStyle } from "./style"

export const EmptyState: FC = () => {
  const { t } = useTranslation()
  return (
    <div css={emptyContainerStyle}>
      <FolderIcon />
      <span>{t("widget.drive_picker.modal.no_file")}</span>
    </div>
  )
}
