import { FC, useState } from "react"
import { css } from "@emotion/react"
import { useTranslation } from "react-i18next"
import { v4 as uuidv4 } from "uuid"
import { PlusIcon, DeleteIcon } from "@illa-design/icon"
import { Button } from "@illa-design/button"
import { Select } from "@illa-design/select"
import { EditorInput } from "@/components/EditorInput"
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
  const { hasType, onChange } = props

  const { t } = useTranslation()

  const getEmptyField = () => {
    return hasType
      ? { key: "", type: "text", value: "", _key: uuidv4() }
      : { key: "", value: "", _key: uuidv4() }
  }
  const [fields, setFields] = useState([getEmptyField()])
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

  const fieldList = fields.map(({ type, _key }, index) => {
    return (
      <div css={fieldItemStyle} key={_key}>
        {hasType ? (
          <>
            <EditorInput
              mode="javascript"
              lineNumbers={false}
              height="32px"
              placeholder="key"
              css={fieldItemKeyStyle}
              onChange={(v) => updateField(index, "key", v)}
            />
            <Select
              value={type}
              options={typeOptions}
              css={fieldItemTypeStyle}
              size="small"
              onChange={(v) => updateField(index, "type", v)}
            />
          </>
        ) : (
          <EditorInput
            mode="javascript"
            lineNumbers={false}
            height="32px"
            placeholder="key"
            css={fieldItemKeyStyle}
            onChange={(v) => updateField(index, "key", v)}
          />
        )}

        <EditorInput
          mode="javascript"
          lineNumbers={false}
          height="32px"
          placeholder="value"
          css={fieldItemValueStyle}
          onChange={(v) => updateField(index, "value", v)}
        />
        <div css={deleteIconWrapperStyle} onClick={() => removeField(index)}>
          <DeleteIcon size="12px" />
        </div>
      </div>
    )
  })

  function addNewField() {
    setFields([...fields, getEmptyField()])
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

  return (
    <div>
      {fieldList}
      <Button
        variant="text"
        size="medium"
        colorScheme="techPurple"
        leftIcon={<PlusIcon />}
        css={css(newButtonStyle)}
        onClick={addNewField}
      >
        {t("editor.action.panel.btn.new")}
      </Button>
    </div>
  )
}
