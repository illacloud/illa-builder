import { FC } from "react"
import { useTranslation } from "react-i18next"
import { ModalContent } from "@/components/CodeEditor/ModalCodeMirror/content"
import { FooterContent } from "@/components/CodeEditor/ModalCodeMirror/footer"
import { ModalCodeMirrorProps } from "@/components/CodeEditor/ModalCodeMirror/interface"
import { MovableModal } from "@/components/MovableModal"

export const ModalCodeMirror: FC<ModalCodeMirrorProps> = (props) => {
  const {
    title,
    value,
    description,
    lang,
    expectValueType,
    onChange,
    onClickSaveButton,
    onClose,
    placeholder,
    wrappedCodeFunc,
  } = props
  const { t } = useTranslation()

  return (
    <MovableModal
      title={title || t("editor.inspect.setter_label.code.write_code")}
      bodyContent={
        <ModalContent
          description={
            description ||
            t("editor.inspect.setter_description.code.write_code")
          }
          lang={lang}
          expectValueType={expectValueType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          wrappedCodeFunc={wrappedCodeFunc}
        />
      }
      footerContent={
        onClickSaveButton ? (
          <FooterContent onClickSaveButton={onClickSaveButton} />
        ) : null
      }
      onClose={onClose}
    />
  )
}
