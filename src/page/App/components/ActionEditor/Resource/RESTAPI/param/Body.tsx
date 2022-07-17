import { FC, useMemo, useCallback } from "react"
import { Select } from "@illa-design/select"
import { CodeEditor } from "@/components/CodeEditor"
import { FieldArray } from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor/FieldArray"
import { ValueType } from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor/FieldArray/interface"
import {
  initArrayField,
  getEmptyField,
} from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor/FieldArray/util"
import { BodyParams, BodyProps, ContentType } from "../interface"
import { bodyFieldStyle, descriptionCodeStyle, descriptionStyle } from "./style"

const bodyTypeOptiosn = [
  {
    value: "json",
    label: "JSON",
  },
  {
    value: "raw",
    label: "Raw",
  },
  {
    value: "x-www-form-urlencoded",
    label: "x-www-form-urlencoded",
  },
  {
    value: "form-data",
    label: "Form Data",
  },
  {
    value: "binary",
    label: "binary",
  },
  {
    value: "none",
    label: "None",
  },
]

const typeOptions = [
  {
    value: "text",
    label: "Text",
  },
  {
    value: "file",
    label: "File",
  },
]

export const Body: FC<BodyProps> = (props) => {
  const { value, bodyType, onChangeBodyType, onChangeValue } = props

  const onAddWithType = useCallback(() => {
    onChangeValue?.([...(value as BodyParams[]), getEmptyField(true)])
  }, [value, onChangeValue])

  const onRemoveWithType = useCallback(
    (_key) => {
      const newVal = [...(value as BodyParams[])]

      if ((value as BodyParams[]).length === 1) {
        onChangeValue?.([getEmptyField(true)])
        return
      }

      newVal.splice(
        newVal.findIndex((i) => i._key === _key),
        1,
      )
      onChangeValue?.(newVal)
    },
    [value, onChangeValue],
  )

  const onChangeWithType = useCallback(
    (newValue) => {
      const newVal = [...(value as BodyParams[])]

      newVal.splice(
        newVal.findIndex(({ _key }) => _key === newValue._key),
        1,
        newValue,
      )

      onChangeValue?.(newVal)
    },
    [value],
  )

  const onAdd = useCallback(() => {
    onChangeValue?.([...value, getEmptyField()])
  }, [value, onChangeValue])

  const onRemove = useCallback(
    (_key) => {
      const newVal = [...value]

      if (value.length === 1) {
        onChangeValue?.([getEmptyField()])
        return
      }

      newVal.splice(
        newVal.findIndex((i) => i._key === _key),
        1,
      )
      onChangeValue?.(newVal)
    },
    [value, onChangeValue],
  )

  const onChange = useCallback(
    (newValue) => {
      const newVal = [...value]

      newVal.splice(
        newVal.findIndex(({ _key }) => _key === newValue._key),
        1,
        newValue,
      )

      onChangeValue?.(newVal)
    },
    [value],
  )

  const bodyForm = useMemo(() => {
    switch (bodyType) {
      case "json":
      case "x-www-form-urlencoded":
        return (
          <FieldArray
            value={value as ValueType[]}
            onAdd={onAdd}
            onRemove={onRemove}
            onChange={onChange}
          />
        )
      case "form-data":
        return (
          <FieldArray
            hasType
            value={value as ValueType[]}
            typeOptions={typeOptions}
            onAdd={onAddWithType}
            onRemove={onRemoveWithType}
            onChange={onChangeWithType}
          />
        )
      case "raw":
        return (
          <CodeEditor
            value={value as string}
            mode="TEXT_JS"
            expectedType="String"
            onChange={onChangeValue}
          />
        )
      case "binary":
        return (
          <>
            <dd css={descriptionStyle}>
              Either a binary string, or an object:{" "}
              <code
                css={descriptionCodeStyle}
              >{`{data: binary string, filename?: string }`}</code>
            </dd>
            <CodeEditor
              value={value as string}
              mode="TEXT_JS"
              expectedType="String"
              onChange={onChangeValue}
            />
          </>
        )
      case "none":
      default:
        return null
    }
  }, [bodyType, value, onChangeBodyType, onChangeValue])

  const onBodyTypeChange = useCallback(
    (bodyType: ContentType) => {
      switch (bodyType) {
        case "json":
        case "x-www-form-urlencoded":
          onChangeValue?.(initArrayField([getEmptyField(true)]))
          break
        case "form-data":
          onChangeValue?.(initArrayField([getEmptyField()]))
          break
        case "raw":
        case "binary":
        default:
          onChangeValue?.("")
          break
      }

      onChangeBodyType?.(bodyType)
    },
    [onChangeBodyType, onChangeValue],
  )

  return (
    <div css={bodyFieldStyle}>
      <Select
        colorScheme="techPurple"
        value={bodyType}
        options={bodyTypeOptiosn}
        onChange={onBodyTypeChange}
        size="medium"
      />
      {bodyForm}
    </div>
  )
}

Body.displayName = "RESTAPIParamBody"
