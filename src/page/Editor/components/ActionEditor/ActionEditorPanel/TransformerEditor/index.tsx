import { FC } from "react"
import { useTranslation } from "react-i18next"
import { EditorInput } from "@/components/EditorInput"
import { transformerContainerStyle, transfomerTipsStyle } from "./style"

export const TransformerEditor: FC = (props) => {
  const { t } = useTranslation()

  return (
    <div css={transformerContainerStyle}>
      <EditorInput
        mode="javascript"
        height={"100px"}
        placeholder={t("editor.action.resource.transformer.placeholder.tip")}
      />
      <dd css={transfomerTipsStyle}>
        {t("editor.action.resource.transformer.tip.external_reference")}
      </dd>
    </div>
  )
}

TransformerEditor.displayName = "TransformerEditor"
