import { FirebaseGetUserByPhone } from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { FirebaseActionPartProps } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/intreface"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const GetUserByPhonePart: FC<FirebaseActionPartProps> = (props) => {
  const { t } = useTranslation()
  const options = props.options as FirebaseGetUserByPhone
  const { handleValueChange } = props

  return (
    <InputEditor
      title={t("editor.action.panel.firebase.phone_number")}
      value={options.filter}
      onChange={(value) => handleValueChange(value, "filter")}
      expectedType={VALIDATION_TYPES.STRING}
    />
  )
}

GetUserByPhonePart.displayName = "GetUserByPhonePart"
