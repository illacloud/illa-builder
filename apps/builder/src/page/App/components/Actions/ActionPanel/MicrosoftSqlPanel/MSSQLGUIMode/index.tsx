import { FC, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Select } from "@illa-design/react"
import { Api } from "@/api/base"
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
  const newModeContent = modeContent as MicrosoftSqlActionGUIMode
  const { t } = useTranslation()
  const [collectionSelect, setCollectionSelect] = useState<string[]>([])

  useEffect(() => {
    if (!resourceId) {
      return
    }
    Api.request(
      {
        url: `resources/${resourceId}/meta`,
        method: "GET",
      },
      ({ data }: { data: ResourcesData }) => {
        const tables = Object.keys(data.schema ?? {}).map((key) => key)
        setCollectionSelect(tables)
      },
      () => {},
      () => {},
      () => {},
    )
  }, [resourceId])

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
          width="100%"
          placeholder={t("editor.action.panel.mssql.placeholder.table")}
          onChange={(value: string) => onChange(value, "table")}
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
