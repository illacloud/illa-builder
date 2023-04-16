import { FC } from "react"
import { useTranslation } from "react-i18next"
import { CollectionInput } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/components/CollectionInput"
import { CollectionRecordEditor } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/components/CollectionRecordEditor"
import { FirebaseActionPartProps } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/intreface"
import { CheckboxInput } from "@/page/App/components/CheckboxInput"
import { InputEditor } from "@/page/App/components/InputEditor"
import {
  CollectionType,
  QueryCollectionGroup,
} from "@/redux/currentApp/action/firebaseAction"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const QueryCollectionGroupPart: FC<FirebaseActionPartProps> = (
  props,
) => {
  const { t } = useTranslation()
  const options = props.options as QueryCollectionGroup
  const { handleValueChange } = props

  return (
    <>
      <CollectionInput
        handleValueChange={handleValueChange}
        value={options.collection}
        collectionType={options.collectionType as CollectionType}
      />
      <CollectionRecordEditor
        name={"where"}
        handleValueChange={handleValueChange}
        defaultValue={options.where}
      />
      <InputEditor
        title={t("editor.action.panel.firebase.limit")}
        value={options.limit}
        onChange={(value) => handleValueChange(value, "limit")}
        expectedType={VALIDATION_TYPES.NUMBER}
      />
      <InputEditor
        title={t("editor.action.panel.firebase.order_by")}
        value={options.orderBy}
        onChange={(value) => handleValueChange(value, "orderBy")}
        expectedType={VALIDATION_TYPES.STRING}
      />
      <InputEditor
        title={t("editor.action.panel.firebase.ordering_direction")}
        value={options.orderDirection}
        onChange={(value) => handleValueChange(value, "orderDirection")}
        expectedType={VALIDATION_TYPES.STRING}
        placeholder={t("editor.action.panel.firebase.placeholder.asc")}
      />
      <CheckboxInput
        checkboxTitle={t("editor.action.panel.firebase.use_start_at")}
        checkboxValue={options.startAt.trigger}
        onCheckboxChange={(value) =>
          handleValueChange(
            {
              value: options.startAt.value,
              trigger: value,
            },
            "startAt",
          )
        }
        inputTitle={t("editor.action.panel.firebase.start_at")}
        inputValue={options.startAt.value}
        onValueChange={(value) =>
          handleValueChange(
            {
              trigger: options.startAt.trigger,
              value,
            },
            "startAt",
          )
        }
        hasExpectedType={false}
      />
      <CheckboxInput
        checkboxTitle={t("editor.action.panel.firebase.use_end_at")}
        checkboxValue={options.endAt.trigger}
        onCheckboxChange={(value) =>
          handleValueChange(
            {
              value: options.endAt.value,
              trigger: value,
            },
            "endAt",
          )
        }
        inputTitle={t("editor.action.panel.firebase.end_at")}
        inputValue={options.endAt.value}
        onValueChange={(value) =>
          handleValueChange(
            {
              trigger: options.endAt.trigger,
              value,
            },
            "endAt",
          )
        }
        hasExpectedType={false}
      />
    </>
  )
}

QueryCollectionGroupPart.displayName = "QueryCollectionGroupPart"
