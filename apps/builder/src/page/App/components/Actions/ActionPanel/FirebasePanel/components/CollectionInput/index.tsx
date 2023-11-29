import { FirebaseCollectionType } from "@illa-public/public-types"
import { FC, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Select } from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { CollectionInputProps } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/components/CollectionInput/interface"
import {
  actionBodyTypeStyle,
  actionItemCodeEditorStyle,
  actionItemLabelStyle,
  actionItemStyle,
} from "@/page/App/components/Actions/ActionPanel/FirebasePanel/style"
import { getCachedAction } from "@/redux/config/configSelector"
import { fetchResourceMeta } from "@/services/resource"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const CollectionInput: FC<CollectionInputProps> = (props) => {
  const { t } = useTranslation()
  const { handleValueChange, collectionType, value } = props
  const isDropdown = collectionType === FirebaseCollectionType.DROPDOWN
  const action = useSelector(getCachedAction)!

  const [collectionSelect, setCollectionSelect] = useState<string[]>([])

  const handleCollectionTypeChange = useCallback(() => {
    const contentType = isDropdown
      ? FirebaseCollectionType.RAW
      : FirebaseCollectionType.DROPDOWN
    handleValueChange(contentType, "collectionType")
  }, [handleValueChange, isDropdown])

  const handleChange = (value: string) => handleValueChange(value, "collection")

  useEffect(() => {
    if (action.resourceID == undefined) return
    fetchResourceMeta(action.resourceID).then(({ data }) => {
      let tables: string[] = []
      if (data.Schema) {
        tables = (data.Schema.collections || []) as string[]
      }
      setCollectionSelect(tables)
    })
  }, [action.resourceID])

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
          w="100%"
          placeholder={t(
            "editor.action.panel.firebase.placeholder.select_collection",
          )}
          onChange={(v) => {
            handleChange(v as string)
          }}
          options={collectionSelect}
        />
      ) : (
        <div css={actionItemCodeEditorStyle}>
          <CodeEditor
            value={value}
            singleLine
            onChange={handleChange}
            expectValueType={VALIDATION_TYPES.STRING}
            lang={CODE_LANG.JAVASCRIPT}
            codeType={CODE_TYPE.EXPRESSION}
            canShowCompleteInfo
            placeholder={t(
              "editor.action.panel.firebase.placeholder.input_collection",
            )}
          />
        </div>
      )}
    </div>
  )
}

CollectionInput.displayName = "CollectionInput"
