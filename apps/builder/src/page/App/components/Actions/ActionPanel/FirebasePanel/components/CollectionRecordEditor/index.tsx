import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { Input, Select } from "@illa-design/react"
import { OperationList, Params } from "@/redux/currentApp/action/firebaseAction"
import { InputRecordEditor } from "@/page/App/components/InputRecordEditor"
import { Controller, useForm } from "react-hook-form"
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
      const curOperation = operation || newRecords[index].operation || ""
      newRecords[index] = {
        key,
        value: v,
        operation: curOperation,
      }
      onChange(newRecords)
      handleValueChange(newRecords, "where")
    },
    [handleValueChange, getValues, name],
  )

  return (
    <>
      <Controller
        control={control}
        defaultValue={defaultValue}
        render={({ field: { value, onChange } }) => {
          return (
            <InputRecordEditor
              label={t("editor.action.panel.firebase.where")}
              records={value}
              customRender={(record, index) => (
                <>
                  <Input
                    w="100%"
                    borderColor="techPurple"
                    value={record.key}
                    placeholder="key"
                    bdRadius="8px 0 0 8px"
                    onChange={(val) => {
                      handleChange(
                        index,
                        val,
                        record.value,
                        record.operation,
                        onChange,
                      )
                    }}
                  />
                  <Select
                    colorScheme="techPurple"
                    showSearch={true}
                    defaultValue={record.operation}
                    value={record.operation}
                    width="100%"
                    bdRadius="0"
                    onChange={(val) =>
                      handleChange(
                        index,
                        record.key,
                        record.value,
                        val,
                        onChange,
                      )
                    }
                    options={OperationList}
                  />
                  <Input
                    w="100%"
                    borderColor="techPurple"
                    placeholder="value"
                    value={record.value}
                    ml="-1px"
                    bdRadius="0"
                    onChange={(val) => {
                      handleChange(
                        index,
                        record.key,
                        val,
                        record.operation,
                        onChange,
                      )
                    }}
                  />
                </>
              )}
              onAdd={() => {
                onChange([...value, { key: "", value: "", operation: "" }])
              }}
              onDelete={(index, record) => {
                let newRecords = [...value]
                newRecords.splice(index, 1)
                if (newRecords.length === 0) {
                  newRecords = [{ key: "", value: "", operation: "" }]
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
    </>
  )
}

CollectionRecordEditor.displayName = "CollectionRecordEditor"
