import { FC, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { v4 as uuidv4 } from "uuid"
import { PlusIcon, DeleteIcon } from "@illa-design/icon"
import { Button } from "@illa-design/button"
import { Select } from "@illa-design/select"
import { CodeEditor } from "@/components/CodeEditor"
import { FieldArrayProps, ValueType } from "./interface"
import {
  deleteIconWrapperStyle,
  fieldItemStyle,
  fieldItemKeyStyle,
  fieldItemValueStyle,
  fieldItemTypeStyle,
  newButtonStyle,
} from "./style"

export const FieldArray: FC<FieldArrayProps> = (props) => {
  const { hasType, onChange, value, autoNewField } = props

  const { t } = useTranslation()

  const getEmptyField = () => {
    return hasType
      ? { key: "", type: "text", value: "", _key: uuidv4() }
      : { key: "", value: "", _key: uuidv4() }
  }
  const [fields, setFields] = useState(
    value?.length
      ? value.map((v) => {
        return { ...v, _key: uuidv4() }
      })
      : [getEmptyField()],
  )

  useEffect(() => {
    setFields(
      value?.length
        ? value.map((v) => {
          return { ...v, _key: uuidv4() }
        })
        : [getEmptyField()],
    )
  }, [value])

  const typeOptions = [
    { value: "text", label: "TEXT" },
    { value: "file", label: "File" },
  ]

  function updateField(
    index: number,
    field: "key" | "type" | "value",
    value: string,
  ) {
    const fieldsCopy = [...fields]
    fieldsCopy[index][field] = value
    setFields(fieldsCopy)

    onChange && onChange(fields.map(({ _key, ...rest }) => rest as ValueType))
  }

  function autoAddField(index: number) {
    if (!autoNewField) {
      return
    }

    if (index === fields.length - 1) {
      addField()
    } else {
      const { key, value } = fields[index]
      key === "" && value === "" && removeField(index)
    }
  }

  function addField() {
    setFields((preFields) => [...preFields, getEmptyField()])
  }

  function removeField(index: number) {
    const fieldsCopy = fields.slice(0)

    if (fieldsCopy.length === 1) {
      setFields([getEmptyField()])
      return
    }
    fieldsCopy.splice(index, 1)
    setFields(fieldsCopy)
  }

  const fieldList = fields.map(({ type, _key }, index) => {
    return (
      <div css={fieldItemStyle} key={_key}>
        {hasType ? (
          <>
            <CodeEditor
              mode="TEXT_JS"
              expectedType="String"
              height="32px"
              placeholder="key"
              css={fieldItemKeyStyle}
              value={fields[index]["key"]}
              onChange={(v) => {
                updateField(index, "key", v)
                autoAddField(index)
              }}
            />
            <Select
              value={type}
              options={typeOptions}
              css={fieldItemTypeStyle}
              size="small"
              onChange={(v) => {
                updateField(index, "type", v)
                autoAddField(index)
              }}
            />
          </>
        ) : (
          <CodeEditor
            mode="TEXT_JS"
            expectedType="String"
            height="32px"
            placeholder="key"
            value={fields[index]["key"]}
            css={fieldItemKeyStyle}
            onChange={(v) => {
              updateField(index, "key", v)
              autoAddField(index)
            }}
          />
        )}

        <CodeEditor
          mode="TEXT_JS"
          expectedType="String"
          height="32px"
          placeholder="value"
          value={fields[index]["value"]}
          css={fieldItemValueStyle}
          onChange={(v) => {
            updateField(index, "value", v)
            autoAddField(index)
          }}
        />
        <div css={deleteIconWrapperStyle} onClick={() => removeField(index)}>
          <DeleteIcon size="12px" />
        </div>
      </div>
    )
  })

  return (
    <div>
      {fieldList}
      {!autoNewField && (
        <Button
          variant="text"
          size="medium"
          colorScheme="techPurple"
          leftIcon={<PlusIcon />}
          _css={newButtonStyle}
          onClick={addField}
        >
          {t("editor.action.panel.btn.new")}
        </Button>
      )}
    </div>
  )
}
