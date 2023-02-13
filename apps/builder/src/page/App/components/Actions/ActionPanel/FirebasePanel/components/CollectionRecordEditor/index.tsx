import { FC, useCallback } from "react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Select } from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import {
  codeMirrorWrapperLabelStyle,
  codeMirrorWrapperValueStyle,
  selectContainerStyle,
} from "@/page/App/components/Actions/ActionPanel/FirebasePanel/components/CollectionRecordEditor/style"
import { actionItemRecordEditorStyle } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/style"
import { RecordEditor } from "@/page/App/components/Actions/ActionPanel/RecordEditor"
import {
  OperationSelectList,
  Params,
} from "@/redux/currentApp/action/firebaseAction"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { CollectionRecordEditorProps } from "./interface"

export const CollectionRecordEditor: FC<CollectionRecordEditorProps> = (
  props,
) => {
  const { t } = useTranslation()

  const { defaultValue, handleValueChange, name } = props
  const { control, getValues } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })

  const handleChange = useCallback(
    (
      index: number,
      key: string,
      v: string,
      operation: string,
      onChange: (...event: any[]) => void,
    ) => {
      const value = getValues()[name]
      let newRecords: Params[] = [...value]
      const curOperation = operation || newRecords[index].condition || ""
      newRecords[index] = {
        field: key,
        value: v,
        condition: curOperation,
      }
      onChange(newRecords)
      handleValueChange(newRecords, "where")
    },
    [handleValueChange, getValues, name],
  )

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      render={({ field: { value, onChange } }) => {
        return (
          <RecordEditor
            label={t("editor.action.panel.firebase.where")}
            records={value}
            customRender={(record, index) => (
              <>
                <div css={actionItemRecordEditorStyle}>
                  <CodeEditor
                    value={record.field}
                    singleLine
                    onChange={(val) => {
                      handleChange(
                        index,
                        val,
                        record.value,
                        record.operation,
                        onChange,
                      )
                    }}
                    wrapperCss={codeMirrorWrapperLabelStyle}
                    expectValueType={VALIDATION_TYPES.STRING}
                    lang={CODE_LANG.JAVASCRIPT}
                    codeType={CODE_TYPE.EXPRESSION}
                    canShowCompleteInfo
                    placeholder="field"
                  />
                </div>
                <Select
                  colorScheme="techPurple"
                  showSearch={true}
                  defaultValue={record.condition}
                  value={record.condition}
                  w="0"
                  ml="-0.5px"
                  mr="-0.5px"
                  bdRadius="0"
                  flexGrow="1"
                  onChange={(val) =>
                    handleChange(
                      index,
                      record.field,
                      record.value,
                      val as string,
                      onChange,
                    )
                  }
                  options={OperationSelectList}
                />
                <div css={actionItemRecordEditorStyle}>
                  <CodeEditor
                    singleLine
                    value={record.value}
                    onChange={(val) => {
                      handleChange(
                        index,
                        record.field,
                        val,
                        record.condition,
                        onChange,
                      )
                    }}
                    wrapperCss={codeMirrorWrapperValueStyle}
                    expectValueType={VALIDATION_TYPES.STRING}
                    lang={CODE_LANG.JAVASCRIPT}
                    codeType={CODE_TYPE.EXPRESSION}
                    canShowCompleteInfo
                    placeholder="value"
                  />
                </div>
              </>
            )}
            onAdd={() => {
              onChange([...value, { field: "", value: "", condition: "" }])
            }}
            onDelete={(index, record) => {
              let newRecords = [...value]
              newRecords.splice(index, 1)
              if (newRecords.length === 0) {
                newRecords = [{ field: "", value: "", condition: "" }]
              }
              onChange(newRecords)
            }}
            onChangeKey={(index, key, v) =>
              handleChange(index, key, v, "", onChange)
            }
            onChangeValue={(index, key, v) =>
              handleChange(index, key, v, "", onChange)
            }
          />
        )
      }}
      name={name}
    />
  )
}

CollectionRecordEditor.displayName = "CollectionRecordEditor"
