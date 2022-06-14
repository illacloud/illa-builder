import { FC, useState } from "react"
import { Select } from "@illa-design/select"
import { FieldArray } from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor/FieldArray"
import { EditorInput } from "@/components/EditorInput"
import { BodyParams, BodyProps, ContentType } from "../interface"
import { bodyFieldStyle, descriptionCodeStyle, descriptionStyle } from "./style"

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
        return <EditorInput mode="javascript" onChange={onChange} />
      case "binary":
        return (
          <>
            <dd css={descriptionStyle}>
              Either a binary string, or an object:{" "}
              <code
                css={descriptionCodeStyle}
              >{`{data: binary string, filename?: string }`}</code>
            </dd>
            <EditorInput mode="javascript" onChange={onChange} />
          </>
        )
      case "none":
      default:
        return null
    }
  }

  return (
    <div css={bodyFieldStyle}>
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
