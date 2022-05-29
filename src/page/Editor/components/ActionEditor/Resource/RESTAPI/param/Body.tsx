import { FC, useState } from "react"
import { Select } from "@illa-design/select"
import { FieldArray } from "@/page/Editor/components/ActionEditor/ActionEditorPanel/FieldArray"
import { EditorInput } from "@/components/EditorInput"
import { BodyParams, BodyProps, ContentType } from "../interface"
import { bodyFieldCss, descriptionCodeCss, descriptionCss } from "./style"

export const Body: FC<BodyProps> = (props) => {
  const { value, onChange } = props
  const [bodyType, setBodyType] = useState<ContentType>("raw")
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

  function renderBody() {
    switch (bodyType) {
      case "json":
      case "x-www-form-urlencoded":
        return <FieldArray value={value as BodyParams[]} onChange={onChange} />
      case "form-data":
        return (
          <FieldArray
            hasType
            value={value as BodyParams[]}
            onChange={onChange}
          />
        )
      case "raw":
        return (
          <EditorInput
            mode="javascript"
            value={value as string}
            onChange={onChange}
          />
        )
      case "binary":
        return (
          <>
            <dd css={descriptionCss}>
              Either a binary string, or an object:{" "}
              <code
                css={descriptionCodeCss}
              >{`{data: binary string, filename?: string }`}</code>
            </dd>
            <EditorInput
              mode="javascript"
              value={value as string}
              onChange={onChange}
            />
          </>
        )
      case "none":
      default:
        return null
    }
  }

  return (
    <div css={bodyFieldCss}>
      <Select
        value={bodyType}
        options={bodyTypeOptiosn}
        onChange={setBodyType}
        size={"small"}
      />
      {renderBody()}
    </div>
  )
}

Body.displayName = "RESTAPIParamBody"
