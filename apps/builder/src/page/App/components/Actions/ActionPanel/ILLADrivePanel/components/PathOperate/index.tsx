import { useContext } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@illa-design/react"
import { FolderOperateModalContext } from "@/components/FolderOperateModal/context"
import { PathSelectContext } from "../../provider"

const PathOperate = () => {
  const { handleOptionsValueChange } = useContext(PathSelectContext)
  const { currentFolderPath, setFolderOperateVisible } = useContext(
    FolderOperateModalContext,
  )
  const { t } = useTranslation()
  const handleClick = () => {
    handleOptionsValueChange("path", `/${currentFolderPath}`)
    setFolderOperateVisible(false)
  }
  return (
    <Button colorScheme="techPurple" onClick={handleClick}>
      <span>{t("drive.upload.select.confirm_button")}</span>
    </Button>
  )
}
export default PathOperate
