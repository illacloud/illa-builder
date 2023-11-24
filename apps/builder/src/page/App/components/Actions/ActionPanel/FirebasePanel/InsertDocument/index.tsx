import {
  FirebaseCollectionType,
  FirebaseInsertDocument,
} from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { CollectionInput } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/components/CollectionInput"
import { FirebaseActionPartProps } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/intreface"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const InsertDocumentPart: FC<FirebaseActionPartProps> = (props) => {
  const { t } = useTranslation()
  const options = props.options as FirebaseInsertDocument
  const { handleValueChange } = props

  return (
    <>
      <CollectionInput
        handleValueChange={handleValueChange}
        value={options.collection}
        collectionType={options.collectionType as FirebaseCollectionType}
      />
      <InputEditor
        title={t("editor.action.panel.firebase.document_id")}
        value={options.id}
        onChange={(value) => handleValueChange(value, "id")}
        expectedType={VALIDATION_TYPES.STRING}
        tips={t("editor.action.panel.firebase.tips.document_id")}
      />
      <InputEditor
        title={t("editor.action.panel.firebase.value")}
        value={options.value}
        onChange={(value) => handleValueChange(value, "value")}
        expectedType={VALIDATION_TYPES.OBJECT}
        placeholder={t(
          "editor.action.panel.firebase.placeholder.document_value",
        )}
      />
    </>
  )
}

InsertDocumentPart.displayName = "InsertDocumentPart"
