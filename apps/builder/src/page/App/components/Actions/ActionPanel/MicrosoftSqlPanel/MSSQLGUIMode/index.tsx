import { MicrosoftSqlActionGUIMode } from "@illa-public/public-types"
import { FC, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { createMessage } from "@illa-design/react"
import { MSSQLModeProps } from "@/page/App/components/Actions/ActionPanel/MicrosoftSqlPanel/interface"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { fetchResourceMeta } from "@/services/resource"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const MSSQLGUIMode: FC<MSSQLModeProps> = (props) => {
  const { modeContent, onChange, resourceID } = props
  const message = createMessage()
  const newModeContent = modeContent as MicrosoftSqlActionGUIMode
  const { t } = useTranslation()
  const [collectionSelect, setCollectionSelect] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const handleRequestError = useCallback(() => {
    setError(true)
    setLoading(false)
    message.error({
      type: "error",
      content: t("editor.action.message.mssql.table_error"),
    })
  }, [message, t])

  useEffect(() => {
    if (!resourceID) {
      return
    }
    setLoading(true)
    fetchResourceMeta(resourceID)
      .then(
        ({ data }) => {
          const tables = Object.keys(data.Schema ?? {}).map((key) => key)
          setCollectionSelect(tables)
          setLoading(false)
          setError(false)
        },
        () => {
          handleRequestError()
        },
      )
      .finally(() => {
        setLoading(false)
      })
  }, [handleRequestError, resourceID])

  return (
    <>
      <SingleTypeComponent
        componentType="select"
        placeholder={t("editor.action.panel.mssql.placeholder.table")}
        onSelectedValueChange={(value) =>
          onChange((value || "") as string, "table")
        }
        options={collectionSelect}
        value={newModeContent.table}
        showSearch={true}
        title={t("editor.action.panel.mssql.table")}
        loading={loading}
        error={error}
      />
      <InputEditor
        style={{ height: "88px" }}
        title={t("editor.action.panel.mssql.insert_record")}
        placeholder={t("editor.action.panel.mssql.placeholder.insert_record")}
        lineNumbers={true}
        expectedType={VALIDATION_TYPES.ARRAY}
        value={newModeContent.records}
        onChange={(value) => onChange(value, "records")}
      />
    </>
  )
}
MSSQLGUIMode.displayName = "MSSQLGUIMode"
