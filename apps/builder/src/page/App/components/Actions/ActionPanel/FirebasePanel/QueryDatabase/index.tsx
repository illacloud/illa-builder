import { FC } from "react"
import { useTranslation } from "react-i18next"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { FirebaseActionPartProps } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/intreface"
import { QueryDatabase } from "@/redux/currentApp/action/firebaseAction"
import { InputEditor } from "@/page/App/components/InputEditor"

export const QueryDatabasePart: FC<FirebaseActionPartProps> = (props) => {
  const { t } = useTranslation()
  const options = props.options as QueryDatabase
  const { handleValueChange } = props

  return (
    <>
      <InputEditor
        title={t("editor.action.panel.firebase.database_ref")}
        value={options.databaseRef}
        onChange={(value) => handleValueChange(value, "databaseRef")}
        expectedType={VALIDATION_TYPES.STRING}
      />
    </>
  )
}

QueryDatabasePart.displayName = "QueryDatabasePart"
