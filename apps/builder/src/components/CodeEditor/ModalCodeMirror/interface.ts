import { CodeEditorProps } from "@/components/CodeEditor/interface"
import { MovableModalProps } from "@/components/Modal/interface"

export interface ModalBodyContent {
  description?: string
  placeholder?: string
  lang?: CodeEditorProps["lang"]
  expectValueType?: CodeEditorProps["expectValueType"]
  scopeOfAutoComplete?: CodeEditorProps["scopeOfAutoComplete"]
  onChange?: CodeEditorProps["onChange"]
  wrappedCodeFunc?: CodeEditorProps["wrappedCodeFunc"]
  onFocus?: CodeEditorProps["onFocus"]
  onBlur?: CodeEditorProps["onBlur"]
  value: string
  codeType?: CodeEditorProps["codeType"]
}

export interface FooterContentProps {
  onClickSaveButton: () => void
}

export interface ModalCodeMirrorProps
  extends Omit<MovableModalProps, "bodyContent" | "footerContent">,
    ModalBodyContent {
  onClickSaveButton?: () => void
}
