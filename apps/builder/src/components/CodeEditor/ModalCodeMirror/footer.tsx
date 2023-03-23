import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@illa-design/react"
import { FooterContentProps } from "@/components/CodeEditor/ModalCodeMirror/interface"
import { saveButtonStyle } from "@/components/CodeEditor/ModalCodeMirror/style"

export const FooterContent: FC<FooterContentProps> = (props) => {
  const { t } = useTranslation()
  const { onClickSaveButton } = props
  return (
    <Button
      colorScheme="techPurple"
      onClick={onClickSaveButton}
      _css={saveButtonStyle}
    >
      {t("save")}
    </Button>
  )
}
