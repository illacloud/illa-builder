import { FC } from "react"
import { useTranslation } from "react-i18next"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { FirebaseActionPartProps } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/intreface"
import { GetUserByEmail } from "@/redux/currentApp/action/firebaseAction"
import { InputEditor } from "@/page/App/components/InputEditor"

export const GetUserByEmailPart: FC<FirebaseActionPartProps> = (props) => {
  const { t } = useTranslation()
  const options = props.options as GetUserByEmail
  const { handleValueChange } = props

  return (
    <>
      <InputEditor
        title={t("editor.action.panel.firebase.email")}
        value={options.filter}
        onChange={(value) => handleValueChange(value, "filter")}
        expectedType={VALIDATION_TYPES.STRING}
      />
    </>
  )
}

GetUserByEmailPart.displayName = "GetUserByEmailPart"
