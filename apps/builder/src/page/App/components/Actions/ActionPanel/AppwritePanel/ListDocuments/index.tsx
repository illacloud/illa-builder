import { AppwriteListDocuments, Params } from "@illa-public/public-types"
import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { Select } from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { RecordEditor } from "@/components/RecordEditor"
import { AppwriteSubPanelProps } from "@/page/App/components/Actions/ActionPanel/AppwritePanel/interface"
import {
  codeMirrorWrapperLabelStyle,
  codeMirrorWrapperValueStyle,
} from "@/page/App/components/Actions/ActionPanel/FirebasePanel/components/CollectionRecordEditor/style"
import { actionItemRecordEditorStyle } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/style"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

const useListDocumentsFilterOptions = () => {
  const { t } = useTranslation()

  return [
    {
      label: t("editor.action.form.option.appwrite.filter.equal"),
      value: "equal",
    },
    {
      label: t("editor.action.form.option.appwrite.filter.notequal"),
      value: "notEqual",
    },
    {
      label: t("editor.action.form.option.appwrite.filter.lessthan"),
      value: "lessThan",
    },
    {
      label: t("editor.action.form.option.appwrite.filter.lessthanEqual"),
      value: "lessThanEqual",
    },
    {
      label: t("editor.action.form.option.appwrite.filter.greaterthan"),
      value: "greaterThan",
    },
    {
      label: t("editor.action.form.option.appwrite.filter.greaterthanequal"),
      value: "greaterThanEqual",
    },
  ]
}

const useListDocumentsOrderOptions = () => {
  const { t } = useTranslation()

  return [
    {
      label: t("editor.action.form.option.appwrite.order.asc"),
      value: "asc",
    },
    {
      label: t("editor.action.form.option.appwrite.order.desc"),
      value: "desc",
    },
  ]
}

export const ListDocumentsSubPanel: FC<AppwriteSubPanelProps> = (props) => {
  const { handleValueChange, collectionIds } = props
  const params = props.params as AppwriteListDocuments
  const { t } = useTranslation()

  const listDocumentsFilterOptions = useListDocumentsFilterOptions()
  const listDocumentsOrderOptions = useListDocumentsOrderOptions()

  const handleOnAddKeys = useCallback(
    (name?: string) => {
      if (!(name && params.hasOwnProperty(name))) {
        return
      }
      const oldList = params[name as keyof typeof params] as Params[]
      const newListItem: Params =
        name === "filter"
          ? {
              key: "",
              operator: "",
              value: "",
            }
          : { key: "", value: "" }

      let newList = [...oldList, newListItem]
      handleValueChange(name)(newList)
    },
    [handleValueChange, params],
  )

  const handleOnDeleteKeys = useCallback(
    (index: number, record: Params, name?: string) => {
      if (!(name && params.hasOwnProperty(name))) {
        return
      }
      const oldList = params[name as keyof typeof params] as Params[]
      let newRecords = [...oldList]
      const newListItem: Params =
        name === "filter"
          ? { key: "", operator: "", value: "" }
          : { key: "", value: "" }

      newRecords.splice(index, 1)
      if (newRecords.length === 0) {
        newRecords = [newListItem]
      }
      handleValueChange(name)(newRecords)
    },
    [handleValueChange, params],
  )

  const handleOnChangeKeyOrValue = useCallback(
    (
      index: number,
      key: string,
      value: string,
      name?: string,
      operator?: string,
    ) => {
      if (!(name && params.hasOwnProperty(name))) {
        return
      }
      const oldList = params[name as keyof typeof params] as Params[]
      let newList = [...oldList]
      const newListItem: Params = operator
        ? {
            key,
            value,
            operator,
          }
        : { key, value }
      newList[index] = newListItem
      handleValueChange(name)(newList)
    },
    [handleValueChange, params],
  )

  return (
    <>
      <SingleTypeComponent
        componentType="select"
        onChange={handleValueChange("collectionID")}
        value={params.collectionID}
        title={t("editor.action.form.label.appwrite.collectionid")}
        placeholder={t("editor.action.form.placeholder.appwrite.collectionid")}
        options={collectionIds}
      />
      <RecordEditor
        label={t("editor.action.form.label.appwrite.filter")}
        records={params.filter}
        customRender={(record, index) => (
          <>
            <div css={actionItemRecordEditorStyle}>
              <CodeEditor
                value={record.key}
                singleLine
                onChange={(val) => {
                  handleOnChangeKeyOrValue(
                    index,
                    val,
                    record.value,
                    "filter",
                    record.operator,
                  )
                }}
                wrapperCss={codeMirrorWrapperLabelStyle}
                expectValueType={VALIDATION_TYPES.STRING}
                lang={CODE_LANG.JAVASCRIPT}
                codeType={CODE_TYPE.EXPRESSION}
                canShowCompleteInfo
                placeholder={t(
                  "editor.action.form.placeholder.appwrite.filter.attribute",
                )}
              />
            </div>
            <Select
              colorScheme="techPurple"
              showSearch={true}
              defaultValue={record.operator}
              value={record.operator}
              w="0"
              ml="-0.5px"
              mr="-0.5px"
              bdRadius="0"
              flexGrow="1"
              onChange={(val) =>
                handleOnChangeKeyOrValue(
                  index,
                  record.key,
                  record.value,
                  "filter",
                  val as string,
                )
              }
              options={listDocumentsFilterOptions}
            />
            <div css={actionItemRecordEditorStyle}>
              <CodeEditor
                singleLine
                value={record.value}
                onChange={(val) => {
                  handleOnChangeKeyOrValue(
                    index,
                    record.key,
                    val,
                    "filter",
                    record.operator,
                  )
                }}
                wrapperCss={codeMirrorWrapperValueStyle}
                expectValueType={VALIDATION_TYPES.STRING}
                lang={CODE_LANG.JAVASCRIPT}
                codeType={CODE_TYPE.EXPRESSION}
                canShowCompleteInfo
                placeholder={t(
                  "editor.action.form.placeholder.appwrite.filter.value",
                )}
              />
            </div>
          </>
        )}
        name="filter"
        onAdd={handleOnAddKeys}
        onDelete={handleOnDeleteKeys}
        onChangeKey={() => {}}
        onChangeValue={() => {}}
      />
      <RecordEditor
        label={t("editor.action.form.label.appwrite.order")}
        records={params.orderBy}
        customRender={(record, index) => (
          <>
            <div css={actionItemRecordEditorStyle}>
              <CodeEditor
                value={record.key}
                singleLine
                onChange={(val) => {
                  handleOnChangeKeyOrValue(index, val, record.value, "orderBy")
                }}
                wrapperCss={codeMirrorWrapperLabelStyle}
                expectValueType={VALIDATION_TYPES.STRING}
                lang={CODE_LANG.JAVASCRIPT}
                codeType={CODE_TYPE.EXPRESSION}
                canShowCompleteInfo
                placeholder={t("editor.action.form.placeholder.appwrite.order")}
              />
            </div>
            <Select
              colorScheme="techPurple"
              showSearch={true}
              defaultValue={record.value}
              value={record.value}
              w="0"
              bdRadius="0"
              flexGrow="1"
              onChange={(val) =>
                handleOnChangeKeyOrValue(
                  index,
                  record.key,
                  val as string,
                  "orderBy",
                )
              }
              options={listDocumentsOrderOptions}
            />
          </>
        )}
        name="orderBy"
        onAdd={handleOnAddKeys}
        onDelete={handleOnDeleteKeys}
        onChangeKey={() => {}}
        onChangeValue={() => {}}
      />
      <InputEditor
        onChange={handleValueChange("limit")}
        value={params.limit}
        expectedType={VALIDATION_TYPES.NUMBER}
        title={t("editor.action.form.label.appwrite.limit")}
      />
    </>
  )
}
ListDocumentsSubPanel.displayName = "ListDocumentsSubPanel"
