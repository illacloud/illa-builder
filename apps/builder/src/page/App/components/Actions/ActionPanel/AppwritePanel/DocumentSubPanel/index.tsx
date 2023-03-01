import { FC } from "react"
import { useTranslation } from "react-i18next"
import { AppwriteSubPanelProps } from "@/page/App/components/Actions/ActionPanel/AppwritePanel/interface"
import { InputEditor } from "@/page/App/components/InputEditor"
import { DocumentOperations } from "@/redux/currentApp/action/appwriteAction"

export const DocumentSubPanel: FC<AppwriteSubPanelProps> = (props) => {
  const { handleValueChange, withDataEditor } = props
  const params = props.params as DocumentOperations
  const { t } = useTranslation()
  return (
    <>
      <InputEditor
        onChange={handleValueChange("collection")}
        value={params.collection}
        title={t("editor.action.form.label.appwrite.collectionid")}
        lineNumbers
        style={{ height: "88px" }}
      />
      <InputEditor
        onChange={handleValueChange("document")}
        value={params.document}
        title={t("editor.action.form.label.appwrite.documentid")}
        lineNumbers
        style={{ height: "88px" }}
      />
      {withDataEditor && (
        <InputEditor
          value={params.data}
          onChange={handleValueChange("data")}
          lineNumbers
          style={{ height: "88px" }}
          title={t("editor.action.form.label.appwrite.data")}
        />
      )}
    </>
  )
}
DocumentSubPanel.displayName = "DocumentSubPanel"
