import { FC } from "react"
import { useTranslation } from "react-i18next"
import { FirebaseActionPartProps } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/intreface"
import { InputEditor } from "@/page/App/components/InputEditor"
import { CreateUser } from "@/redux/currentApp/action/firebaseAction"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const CreateOneUserPart: FC<FirebaseActionPartProps> = (props) => {
  const { t } = useTranslation()
  const options = props.options as CreateUser
  const { handleValueChange } = props

  return (
    <InputEditor
      title={t("editor.action.panel.firebase.user_object")}
      value={options.object}
      onChange={(value) => handleValueChange(value, "object")}
      expectedType={VALIDATION_TYPES.STRING}
    />
  )
}

CreateOneUserPart.displayName = "CreateOneUserPart"
