import { useTranslation } from "react-i18next"
import { FC, useCallback } from "react"
import { Select } from "@illa-design/react"
import {
  actionBodyTypeStyle,
  actionItemCodeEditorStyle,
  actionItemLabelStyle,
  actionItemStyle,
} from "@/page/App/components/Actions/ActionPanel/FirebasePanel/style"
import {
  CollectionType,
  FirebaseServiceType,
} from "@/redux/currentApp/action/firebaseAction"
import { CodeEditor } from "@/components/CodeEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { CollectionInputProps } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/components/CollectionInput/interface"

export const CollectionInput: FC<CollectionInputProps> = (props) => {
  const { t } = useTranslation()
  const { handleValueChange, collectionType, value } = props
  const isDropdown = collectionType === CollectionType.DROPDOWN

  const handleCollectionTypeChange = useCallback(() => {
    const contentType = isDropdown
      ? CollectionType.RAW
      : CollectionType.DROPDOWN
    handleValueChange(contentType, "collectionType")
  }, [handleValueChange, isDropdown])

  const handleChange = (value: string) => handleValueChange(value, "collection")

  return (
    <div css={actionItemStyle}>
      <span css={actionItemLabelStyle}>
        {t("editor.action.panel.firebase.collection")}
        <span css={actionBodyTypeStyle} onClick={handleCollectionTypeChange}>
          {isDropdown
            ? t("editor.action.panel.firebase.use_raw_id")
            : t("editor.action.panel.firebase.use_a_dropdown")}
        </span>
      </span>
      {isDropdown ? (
        <Select
          colorScheme="techPurple"
          showSearch={true}
          defaultValue={value}
          value={value}
          ml="16px"
          width="100%"
          placeholder={t(
            "editor.action.panel.firebase.placeholder.select_collection",
          )}
          onChange={handleChange}
          options={FirebaseServiceType}
        />
      ) : (
        <CodeEditor
          css={actionItemCodeEditorStyle}
          mode="TEXT_JS"
          value={value}
          onChange={handleChange}
          placeholder={t(
            "editor.action.panel.firebase.placeholder.input_collection",
          )}
          expectedType={VALIDATION_TYPES.STRING}
        />
      )}
    </div>
  )
}

CollectionInput.displayName = "CollectionInput"
