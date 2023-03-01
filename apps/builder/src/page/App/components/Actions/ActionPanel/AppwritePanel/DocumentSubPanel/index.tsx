import { FC } from "react"
import { useTranslation } from "react-i18next"
import { AppwriteSubPanelProps } from "@/page/App/components/Actions/ActionPanel/AppwritePanel/interface"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { DocumentOperations } from "@/redux/currentApp/action/appwriteAction"

export const DocumentSubPanel: FC<AppwriteSubPanelProps> = (props) => {
  const { handleValueChange, withDataEditor } = props
  const params = props.params as DocumentOperations
  const { t } = useTranslation()
  return (
    <>
      <SingleTypeComponent
        componentType="editor"
        onChange={handleValueChange("collection")}
        value={params.collection}
        title={t("editor.action.form.label.appwrite.collectionid")}
      />
      <SingleTypeComponent
        componentType="editor"
        onChange={handleValueChange("document")}
        value={params.document}
        title={t("editor.action.form.label.appwrite.documentid")}
      />
      {withDataEditor && (
        <SingleTypeComponent
          componentType="editor"
          onChange={handleValueChange("data")}
          value={params.data}
          title={t("editor.action.form.label.appwrite.data")}
        />
      )}
    </>
  )
}
DocumentSubPanel.displayName = "DocumentSubPanel"
