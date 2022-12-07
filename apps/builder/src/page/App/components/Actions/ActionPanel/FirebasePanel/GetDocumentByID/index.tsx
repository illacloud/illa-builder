import { FC } from "react"
import { useTranslation } from "react-i18next"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { FirebaseActionPartProps } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/intreface"
import {
  CollectionType,
  GetDocumentByID,
} from "@/redux/currentApp/action/firebaseAction"
import { CollectionInput } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/components/CollectionInput"
import { InputEditor } from "@/page/App/components/InputEditor"

export const GetDocumentByIDPart: FC<FirebaseActionPartProps> = (props) => {
  const { t } = useTranslation()
  const options = props.options as GetDocumentByID
  const { handleValueChange } = props

  return (
    <>
      <CollectionInput
        handleValueChange={handleValueChange}
        value={options.collection}
        collectionType={options.collectionType as CollectionType}
      />
      <InputEditor
        title={t("editor.action.panel.firebase.document_id")}
        value={options.documentID}
        onChange={(value) => handleValueChange(value, "documentID")}
        expectedType={VALIDATION_TYPES.STRING}
      />
    </>
  )
}

GetDocumentByIDPart.displayName = "GetDocumentByIDPart"
