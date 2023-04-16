import { FC } from "react"
import { useTranslation } from "react-i18next"
import { FirebaseActionPartProps } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/intreface"
import { InputEditor } from "@/page/App/components/InputEditor"
import { UpdateOneUser } from "@/redux/currentApp/action/firebaseAction"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const UpdateOneUserPart: FC<FirebaseActionPartProps> = (props) => {
  const { t } = useTranslation()
  const options = props.options as UpdateOneUser
  const { handleValueChange } = props

  return (
    <>
      <InputEditor
        title={t("editor.action.panel.firebase.uid")}
        value={options.uid}
        onChange={(value) => handleValueChange(value, "uid")}
        expectedType={VALIDATION_TYPES.STRING}
      />
      <InputEditor
        lineNumbers
        style={{ height: "88px" }}
        title={t("editor.action.panel.firebase.user_object")}
        value={options.object}
        onChange={(value) => handleValueChange(value, "object")}
        expectedType={VALIDATION_TYPES.OBJECT}
      />
    </>
  )
}

UpdateOneUserPart.displayName = "UpdateOneUserPart"
