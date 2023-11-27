import { FirebaseListUsers } from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { FirebaseActionPartProps } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/intreface"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const ListUsersPart: FC<FirebaseActionPartProps> = (props) => {
  const { t } = useTranslation()
  const options = props.options as FirebaseListUsers
  const { handleValueChange } = props

  return (
    <>
      <InputEditor
        title={t("editor.action.panel.firebase.len_of_list")}
        value={options.number}
        onChange={(value) => handleValueChange(value, "number")}
        expectedType={VALIDATION_TYPES.NUMBER}
        placeholder={"{{1000}}"}
      />
      <InputEditor
        title={t("editor.action.panel.firebase.next_page_token")}
        value={options.token}
        onChange={(value) => handleValueChange(value, "token")}
        expectedType={VALIDATION_TYPES.STRING}
      />
    </>
  )
}

ListUsersPart.displayName = "ListUsersPart"
