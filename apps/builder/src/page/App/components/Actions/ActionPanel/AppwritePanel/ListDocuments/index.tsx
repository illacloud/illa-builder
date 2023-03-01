import { FC } from "react"
import { useTranslation } from "react-i18next"
import { AppwriteSubPanelProps } from "@/page/App/components/Actions/ActionPanel/AppwritePanel/interface"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { ListDocuments } from "@/redux/currentApp/action/appwriteAction"

export const ListDocumentsSubPanel: FC<AppwriteSubPanelProps> = (props) => {
  const { handleValueChange } = props
  const params = props.params as ListDocuments
  const { t } = useTranslation()

  return (
    <>
      <SingleTypeComponent
        componentType="editor"
        onChange={handleValueChange}
        value={params.collection}
      />
      <SingleTypeComponent
        componentType="editor"
        onChange={handleValueChange}
        value={params.collection}
      />
      <SingleTypeComponent
        componentType="editor"
        onChange={handleValueChange}
        value={params.collection}
      />
      <SingleTypeComponent
        componentType="editor"
        onChange={handleValueChange}
        value={params.limit}
      />
    </>
  )
}
ListDocumentsSubPanel.displayName = "ListDocumentsSubPanel"
