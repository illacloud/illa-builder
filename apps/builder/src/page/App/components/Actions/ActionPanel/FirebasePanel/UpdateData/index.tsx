import { FirebaseUpdateData } from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { FirebaseActionPartProps } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/intreface"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const UpdateDataPart: FC<FirebaseActionPartProps> = (props) => {
  const { t } = useTranslation()
  const options = props.options as FirebaseUpdateData
  const { handleValueChange } = props

  return (
    <>
      <InputEditor
        title={t("editor.action.panel.firebase.database_ref")}
        value={options.ref}
        onChange={(value) => handleValueChange(value, "ref")}
        expectedType={VALIDATION_TYPES.STRING}
      />
      <InputEditor
        title={t("editor.action.panel.firebase.object_to_set")}
        value={options.object}
        onChange={(value) => handleValueChange(value, "object")}
        expectedType={VALIDATION_TYPES.OBJECT}
      />
    </>
  )
}

UpdateDataPart.displayName = "UpdateDataPart"
