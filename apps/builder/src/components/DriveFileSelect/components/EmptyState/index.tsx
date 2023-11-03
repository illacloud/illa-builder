import { FolderIcon } from "@illa-public/icon"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { emptyContainerStyle } from "./style"

const EmptyState: FC = () => {
  const { t } = useTranslation()
  return (
    <div css={emptyContainerStyle}>
      <FolderIcon />
      <span>{t("widget.drive_picker.modal.no_file")}</span>
    </div>
  )
}

export default EmptyState
