import { DUPLICATION_HANDLER } from "@illa-public/public-types"
import { FC, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@illa-design/react"
import { SameNameModalContentProps } from "./interface"
import { controlContainer } from "./style"

const SameNameModalContent: FC<SameNameModalContentProps> = (props) => {
  const { objectName, onCancel, createFolder } = props
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  const createFolderEffect = useCallback(
    (duplicationHandler: DUPLICATION_HANDLER) => {
      return async () => {
        setIsLoading(true)
        try {
          await createFolder(objectName, duplicationHandler)
          onCancel()
        } catch (e) {
          console.log(e)
        } finally {
          setIsLoading(false)
        }
      }
    },
    [createFolder, objectName, onCancel],
  )
  return (
    <div css={controlContainer}>
      <Button
        onClick={createFolderEffect(DUPLICATION_HANDLER.RENAME)}
        disabled={isLoading}
      >
        {t("drive.same_name_modal.keep_both")}
      </Button>
      <Button
        colorScheme="red"
        onClick={createFolderEffect(DUPLICATION_HANDLER.COVER)}
        disabled={isLoading}
      >
        {t("drive.same_name_modal.replace")}
      </Button>
    </div>
  )
}

export default SameNameModalContent
