import { CodeEditorProps } from "@/components/CodeEditor/interface"
import { MovableModalProps } from "@/components/MovableModal/interface"

export interface ModalBodyContent {
  description?: string
  placeholder?: string
  lang?: CodeEditorProps["lang"]
  expectValueType?: CodeEditorProps["expectValueType"]
  onChange?: CodeEditorProps["onChange"]
  value: string
}

export interface FooterContentProps {
  onClickSaveButton: () => void
}

export interface ModalCodeMirrorProps
  extends Omit<MovableModalProps, "bodyContent" | "footerContent">,
    ModalBodyContent {
  onClickSaveButton?: () => void
}
