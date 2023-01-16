import { FC } from "react"
import { useTranslation } from "react-i18next"
import { CollectionInput } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/components/CollectionInput"
import { FirebaseActionPartProps } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/intreface"
import { InputEditor } from "@/page/App/components/InputEditor"
import {
  CollectionType,
  GetDocumentByID,
} from "@/redux/currentApp/action/firebaseAction"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

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
        value={options.id}
        onChange={(value) => handleValueChange(value, "id")}
        expectedType={VALIDATION_TYPES.STRING}
      />
    </>
  )
}

GetDocumentByIDPart.displayName = "GetDocumentByIDPart"
