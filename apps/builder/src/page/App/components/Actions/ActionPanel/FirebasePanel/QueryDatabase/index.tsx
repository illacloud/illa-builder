import { FirebaseQueryDatabase } from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { FirebaseActionPartProps } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/intreface"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const QueryDatabasePart: FC<FirebaseActionPartProps> = (props) => {
  const { t } = useTranslation()
  const options = props.options as FirebaseQueryDatabase
  const { handleValueChange } = props

  return (
    <InputEditor
      title={t("editor.action.panel.firebase.database_ref")}
      value={options.ref}
      onChange={(value) => handleValueChange(value, "ref")}
      expectedType={VALIDATION_TYPES.STRING}
    />
  )
}

QueryDatabasePart.displayName = "QueryDatabasePart"
