import { FC } from "react"
import { useTranslation } from "react-i18next"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { FirebaseActionPartProps } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/intreface"
import { UpdateData } from "@/redux/currentApp/action/firebaseAction"
import { InputEditor } from "@/page/App/components/InputEditor"

export const UpdateDataPart: FC<FirebaseActionPartProps> = (props) => {
  const { t } = useTranslation()
  const options = props.options as UpdateData
  const { handleValueChange } = props

  return (
    <>
      <InputEditor
        title={t("editor.action.panel.firebase.database_ref")}
        value={options.databaseRef}
        onChange={(value) => handleValueChange(value, "databaseRef")}
        expectedType={VALIDATION_TYPES.STRING}
      />
      <InputEditor
        title={t("editor.action.panel.firebase.object_to_set")}
        value={options.objectToSet}
        onChange={(value) => handleValueChange(value, "objectToSet")}
        expectedType={VALIDATION_TYPES.STRING}
      />
    </>
  )
}

UpdateDataPart.displayName = "UpdateDataPart"
