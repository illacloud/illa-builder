import { AppwriteDocumentOperations } from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { AppwriteSubPanelProps } from "@/page/App/components/Actions/ActionPanel/AppwritePanel/interface"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const DocumentSubPanel: FC<AppwriteSubPanelProps> = (props) => {
  const { handleValueChange, withDataEditor, collectionIds } = props
  const params = props.params as AppwriteDocumentOperations
  const { t } = useTranslation()
  return (
    <>
      <SingleTypeComponent
        componentType="select"
        onChange={handleValueChange("collectionID")}
        value={params.collectionID}
        title={t("editor.action.form.label.appwrite.collectionid")}
        placeholder={t("editor.action.form.placeholder.appwrite.collectionid")}
        options={collectionIds}
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
          placeholder={t("editor.action.form.placeholder.appwrite.data")}
        />
      )}
    </>
  )
}
DocumentSubPanel.displayName = "DocumentSubPanel"
