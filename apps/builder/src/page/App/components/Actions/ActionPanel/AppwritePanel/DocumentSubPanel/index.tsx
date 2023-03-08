import { FC } from "react"
import { useTranslation } from "react-i18next"
import { AppwriteSubPanelProps } from "@/page/App/components/Actions/ActionPanel/AppwritePanel/interface"
import { InputEditor } from "@/page/App/components/InputEditor"
import { DocumentOperations } from "@/redux/currentApp/action/appwriteAction"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const DocumentSubPanel: FC<AppwriteSubPanelProps> = (props) => {
  const { handleValueChange, withDataEditor } = props
  const params = props.params as DocumentOperations
  const { t } = useTranslation()
  return (
    <>
      <InputEditor
        onChange={handleValueChange("collectionID")}
        value={params.collectionID}
        title={t("editor.action.form.label.appwrite.collectionid")}
      />
      <InputEditor
        onChange={handleValueChange("documentID")}
        value={params.documentID}
        title={t("editor.action.form.label.appwrite.documentid")}
      />
      {withDataEditor && (
        <InputEditor
          value={params.data}
          onChange={handleValueChange("data")}
          lineNumbers
          expectedType={VALIDATION_TYPES.OBJECT}
          style={{ height: "88px" }}
          title={t("editor.action.form.label.appwrite.data")}
        />
      )}
    </>
  )
}
DocumentSubPanel.displayName = "DocumentSubPanel"
