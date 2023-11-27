import { FirebaseCreateUser } from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { FirebaseActionPartProps } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/intreface"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const CreateOneUserPart: FC<FirebaseActionPartProps> = (props) => {
  const { t } = useTranslation()
  const options = props.options as FirebaseCreateUser
  const { handleValueChange } = props

  return (
    <InputEditor
      lineNumbers
      style={{ height: "88px" }}
      title={t("editor.action.panel.firebase.user_object")}
      value={options.object}
      onChange={(value) => handleValueChange(value, "object")}
      expectedType={VALIDATION_TYPES.OBJECT}
    />
  )
}

CreateOneUserPart.displayName = "CreateOneUserPart"
