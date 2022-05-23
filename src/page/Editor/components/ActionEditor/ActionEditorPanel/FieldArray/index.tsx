import { FC, useState } from "react"
import { AddIcon, DeleteIcon } from "@illa-design/icon"
import { Select } from "@illa-design/select"
import { EditorInput } from "@/components/EditorInput"
import { FieldArrayProps } from "./interface"
import {
  ActionTextCSS,
  DeleteIconWrapper,
  FieldItemCSS,
  FieldItemKeyCSS,
  FieldItemValueCSS,
  FieldItemTypeCSS,
  NewButtonCSS,
} from "./style"

export const FieldArray: FC<FieldArrayProps> = (props) => {
  const { autoNewField, hasType } = props
  const getEmptyField = () => {
    return hasType
      ? { key: "", type: "text", value: "" }
      : { key: "", value: "" }
  }
  const [fields, setFields] = useState([getEmptyField()])
  const typeOptions = [
    { value: "text", label: "TEXT" },
    { value: "file", label: "File" },
  ]

  function updateType(index: number, value: string) {
    const fieldsCopy = [...fields]
    fieldsCopy[index].type = value
    setFields(fieldsCopy)
  }

  const fieldList = fields.map(({ key, value, type }, index) => {
    return (
      <div css={FieldItemCSS} key={index}>
        {hasType ? (
          <>
            <EditorInput
              mode={"javascript"}
              lineNumbers={false}
              height={"32px"}
              _css={FieldItemKeyCSS}
            />
            <Select
              value={type}
              options={typeOptions}
              css={FieldItemTypeCSS}
              size={"small"}
              onChange={(v) => updateType(index, v)}
            />
          </>
        ) : (
          <EditorInput
            mode={"javascript"}
            lineNumbers={false}
            height={"32px"}
            _css={FieldItemKeyCSS}
          />
        )}

        <EditorInput
          mode={"javascript"}
          lineNumbers={false}
          height={"32px"}
          _css={FieldItemValueCSS}
        />
        <div css={DeleteIconWrapper} onClick={() => removeField(index)}>
          <DeleteIcon size={"12px"} />
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
      <span css={[NewButtonCSS, ActionTextCSS]} onClick={addNewField}>
        <AddIcon />
        New
      </span>
    </div>
  )
}
