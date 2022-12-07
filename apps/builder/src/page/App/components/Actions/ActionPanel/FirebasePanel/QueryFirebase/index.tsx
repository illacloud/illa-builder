import { FC } from "react"
import { useTranslation } from "react-i18next"
import {
  codeEditorLabelStyle,
  actionItemStyle,
} from "@/page/App/components/Actions/ActionPanel/FirebasePanel/style"
import { Checkbox } from "@illa-design/react"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { FirebaseActionPartProps } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/intreface"
import {
  QueryFirebase,
  CollectionType,
} from "@/redux/currentApp/action/firebaseAction"
import { checkboxItemStyle } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/style"
import { CollectionRecordEditor } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/components/CollectionRecordEditor"
import { CollectionInput } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/components/CollectionInput"
import { InputEditor } from "@/page/App/components/InputEditor"

export const QueryFirebasePart: FC<FirebaseActionPartProps> = (props) => {
  const { t } = useTranslation()
  const options = props.options as QueryFirebase
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
        expectedType={VALIDATION_TYPES.STRING}
      />
      <InputEditor
        title={t("editor.action.panel.firebase.order_by")}
        value={options.orderBy}
        onChange={(value) => handleValueChange(value, "orderBy")}
        expectedType={VALIDATION_TYPES.STRING}
      />

      <InputEditor
        title={t("editor.action.panel.firebase.ordering_direction")}
        value={options.direction}
        onChange={(value) => handleValueChange(value, "direction")}
        expectedType={VALIDATION_TYPES.STRING}
        placeholder={t("editor.action.panel.firebase.placeholder.asc")}
      />

      <div css={actionItemStyle}>
        <span css={codeEditorLabelStyle}></span>
        <Checkbox
          colorScheme="techPurple"
          checked={options.useStartAt}
          ml="16px"
          onChange={(value) => handleValueChange(value, "useStartAt")}
        />
        <span css={checkboxItemStyle}>
          {t("editor.action.panel.firebase.use_start_at")}
        </span>
      </div>
      {options.useStartAt && (
        <InputEditor
          title={t("editor.action.panel.firebase.start_at")}
          value={options.startAt}
          onChange={(value) => handleValueChange(value, "startAt")}
          expectedType={VALIDATION_TYPES.STRING}
        />
      )}
      <div css={actionItemStyle}>
        <span css={codeEditorLabelStyle}></span>
        <Checkbox
          colorScheme="techPurple"
          checked={options.useEndAt}
          ml="16px"
          onChange={(value) => handleValueChange(value, "useEndAt")}
        />
        <span css={checkboxItemStyle}>
          {t("editor.action.panel.firebase.use_end_at")}
        </span>
      </div>
      {options.useEndAt && (
        <InputEditor
          title={t("editor.action.panel.firebase.end_at")}
          value={options.endAt}
          onChange={(value) => handleValueChange(value, "endAt")}
          expectedType={VALIDATION_TYPES.STRING}
        />
      )}
    </>
  )
}

QueryFirebasePart.displayName = "QueryFirebasePart"
