import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { CodeEditor } from "@/components/CodeEditor"
import {
  codeEditorLabelStyle,
  actionItemCodeEditorStyle,
  actionItemStyle,
} from "@/page/App/components/Actions/ActionPanel/FirebasePanel/style"
import { Checkbox, Select } from "@illa-design/react"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { FirebaseActionPartProps } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/intreface"
import {
  FirebaseAction,
  FirebaseContentType,
  FirebaseServiceType,
  QueryCollectionGroup,
} from "@/redux/currentApp/action/firebaseAction"
import {
  checkboxItemStyle,
  actionBodyTypeStyle,
  actionItemLabelStyle,
} from "@/page/App/components/Actions/ActionPanel/FirebasePanel/style"
import { InputRecordEditor } from "@/page/App/components/InputRecordEditor"
import { Controller, useForm } from "react-hook-form"

export const QueryCollectionGroupPart: FC<FirebaseActionPartProps> = (
  props,
) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    FirebaseAction<FirebaseContentType>
  >
  const options = props.options as QueryCollectionGroup
  const isDropdown = options.collectionType === "dropdown"

  const { control } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })

  const handleValueChange = (value: string | boolean, name: string) => {
    dispatch(
      configActions.updateCachedAction({
        ...cachedAction,
        content: {
          ...cachedAction.content,
          options: {
            ...options,
            [name]: value,
          },
        },
      }),
    )
  }

  const handleCollectionTypeChange = useCallback(() => {
    const contentType = isDropdown ? "raw" : "dropdown"
    handleValueChange(contentType, "collectionType")
  }, [handleValueChange])

  return (
    <>
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
            defaultValue={options.collection}
            value={options.collection}
            ml="16px"
            width="100%"
            placeholder={t(
              "editor.action.panel.firebase.placeholder.select_collection",
            )}
            onChange={(value) => handleValueChange(value, "collection")}
            options={FirebaseServiceType}
          />
        ) : (
          <CodeEditor
            css={actionItemCodeEditorStyle}
            mode="TEXT_JS"
            value={options.collection}
            onChange={(value) => handleValueChange(value, "collection")}
            placeholder={t(
              "editor.action.panel.firebase.placeholder.input_collection",
            )}
            expectedType={VALIDATION_TYPES.STRING}
          />
        )}
      </div>
      <Controller
        control={control}
        defaultValue={options.where}
        render={({ field: { value, onChange } }) => (
          <InputRecordEditor
            label={t("editor.action.panel.firebase.where")}
            records={value}
            onAdd={() => {
              onChange([...value, { key: "", value: "" }])
            }}
            onDelete={(index, record) => {
              let newRecords = [...value]
              newRecords.splice(index, 1)
              if (newRecords.length === 0) {
                newRecords = [{ key: "", value: "" }]
              }
              onChange(newRecords)
            }}
            onChangeKey={(index, key, v) => {
              let newRecords = [...value]
              newRecords[index] = { key, value: v }
              onChange(newRecords)
            }}
            onChangeValue={(index, key, v) => {
              let newRecords = [...value]
              newRecords[index].value = v
              onChange(newRecords)
            }}
          />
        )}
        name="headers"
      />
      <div css={actionItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.firebase.limit")}
        </span>
        <CodeEditor
          css={actionItemCodeEditorStyle}
          mode="TEXT_JS"
          value={options.limit}
          onChange={(value) => handleValueChange(value, "limit")}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>
      <div css={actionItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.firebase.order_by")}
        </span>
        <CodeEditor
          css={actionItemCodeEditorStyle}
          mode="TEXT_JS"
          value={options.orderBy}
          onChange={(value) => handleValueChange(value, "orderBy")}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>
      <div css={actionItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.firebase.ordering_direction")}
        </span>
        <CodeEditor
          css={actionItemCodeEditorStyle}
          mode="TEXT_JS"
          value={options.direction}
          onChange={(value) => handleValueChange(value, "direction")}
          placeholder={t("editor.action.panel.firebase.placeholder.asc")}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>
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
        <div css={actionItemStyle}>
          <span css={codeEditorLabelStyle}>
            {t("editor.action.panel.firebase.start_at")}
          </span>
          <CodeEditor
            css={actionItemCodeEditorStyle}
            mode="TEXT_JS"
            value={options.startAt}
            onChange={(value) => handleValueChange(value, "startAt")}
            expectedType={VALIDATION_TYPES.STRING}
          />
        </div>
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
        <div css={actionItemStyle}>
          <span css={codeEditorLabelStyle}>
            {t("editor.action.panel.firebase.end_at")}
          </span>
          <CodeEditor
            css={actionItemCodeEditorStyle}
            mode="TEXT_JS"
            value={options.endAt}
            onChange={(value) => handleValueChange(value, "endAt")}
            expectedType={VALIDATION_TYPES.STRING}
          />
        </div>
      )}
    </>
  )
}

QueryCollectionGroupPart.displayName = "QueryCollectionGroupPart"
