import { FC, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Select, createMessage } from "@illa-design/react"
import { BuilderApi } from "@/api/base"
import { MSSQLModeProps } from "@/page/App/components/Actions/ActionPanel/MicrosoftSqlPanel/interface"
import { InputEditor } from "@/page/App/components/InputEditor"
import {
  actionItemStyle,
  codeEditorLabelStyle,
} from "@/page/App/components/InputEditor/style"
import { MicrosoftSqlActionGUIMode } from "@/redux/currentApp/action/microsoftSqlAction"
import { ResourcesData } from "@/redux/resource/resourceState"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const MSSQLGUIMode: FC<MSSQLModeProps> = (props) => {
  const { modeContent, onChange, resourceId } = props
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
    if (!resourceId) {
      return
    }
    BuilderApi.teamRequest(
      {
        url: `resources/${resourceId}/meta`,
        method: "GET",
      },
      ({ data }: { data: ResourcesData }) => {
        const tables = Object.keys(data.schema ?? {}).map((key) => key)
        setCollectionSelect(tables)
        setLoading(false)
        setError(false)
      },
      () => {
        handleRequestError()
      },
      () => {
        handleRequestError()
      },
      () => {
        setLoading(true)
      },
    )
  }, [handleRequestError, resourceId])

  return (
    <>
      <div css={actionItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.mssql.table")}
        </span>
        <Select
          colorScheme="techPurple"
          showSearch={true}
          defaultValue={newModeContent.table}
          value={newModeContent.table}
          ml="16px"
          w="100%"
          loading={loading}
          error={error}
          placeholder={t("editor.action.panel.mssql.placeholder.table")}
          onChange={(value) => onChange((value || "") as string, "table")}
          options={collectionSelect}
        />
      </div>
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
