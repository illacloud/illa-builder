import { FC, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { AddIcon, DeleteIcon } from "@illa-design/icon"
import { Select } from "@illa-design/select"
import { EditorInput } from "@/components/EditorInput"
import { FieldArrayProps } from "./interface"
import {
  actionTextCss,
  DeleteIconWrapper,
  fieldItemCss,
  fieldItemKeyCss,
  fieldItemValueCss,
  fieldItemTypeCss,
  newButtonCss,
} from "./style"

export const FieldArray: FC<FieldArrayProps> = (props) => {
  const { hasType, value, onChange } = props

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

    onChange && onChange(fields.map(({ _key, ...rest }) => rest))
  }

  const fieldList = fields.map(({ key, value, type, _key }, index) => {
    return (
      <div css={fieldItemCss} key={_key}>
        {hasType ? (
          <>
            <EditorInput
              mode="javascript"
              lineNumbers={false}
              height="32px"
              placeholder="key"
              _css={fieldItemKeyCss}
              onChange={(v) => updateField(index, "key", v)}
            />
            <Select
              value={type}
              options={typeOptions}
              css={fieldItemTypeCss}
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
            _css={fieldItemKeyCss}
            onChange={(v) => updateField(index, "key", v)}
          />
        )}

        <EditorInput
          mode="javascript"
          lineNumbers={false}
          height="32px"
          placeholder="value"
          _css={fieldItemValueCss}
          onChange={(v) => updateField(index, "value", v)}
        />
        <div css={DeleteIconWrapper} onClick={() => removeField(index)}>
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
      <span css={[newButtonCss, actionTextCss]} onClick={addNewField}>
        <AddIcon />
        New
      </span>
    </div>
  )
}
