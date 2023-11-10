import { FolderIcon } from "@illa-public/icon"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { emptyContainerStyle } from "./style"

const EmptyState: FC = () => {
  const { t } = useTranslation()
  return (
    <div css={emptyContainerStyle}>
      <FolderIcon />
      <span>{t("drive.move_modal.no_folders")}</span>
    </div>
  )
}

export default EmptyState
