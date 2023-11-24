import { FirebaseGetCollections } from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { FirebaseActionPartProps } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/intreface"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const GetCollectionsPart: FC<FirebaseActionPartProps> = (props) => {
  const { t } = useTranslation()
  const options = props.options as FirebaseGetCollections
  const { handleValueChange } = props

  return (
    <InputEditor
      title={t("editor.action.panel.firebase.parent_document_id")}
      value={options.parent}
      onChange={(value) => handleValueChange(value, "parent")}
      expectedType={VALIDATION_TYPES.STRING}
      tips={t("editor.action.panel.firebase.tips.parent_document_id_tips")}
    />
  )
}

GetCollectionsPart.displayName = "GetCollectionsPart"
