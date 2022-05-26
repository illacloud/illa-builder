import { FC, useState } from "react"
import { Select } from "@illa-design/select"
import { ContentType } from "./interface"
import { FieldArray } from "@/page/Editor/components/ActionEditor/ActionEditorPanel/FieldArray"
import { EditorInput } from "@/components/EditorInput"
import { bodyFieldCss, descriptionCodeCss, descriptionCss } from "./style"

export const Body: FC = () => {
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
        return <FieldArray />
      case "form-data":
        return <FieldArray hasType />
      case "raw":
        return <EditorInput mode="javascript" />
      case "binary":
        return (
          <>
            <dd css={descriptionCss}>
              Either a binary string, or an object:{" "}
              <code
                css={descriptionCodeCss}
              >{`{data: binary string, filename?: string }`}</code>
            </dd>
            <EditorInput mode="javascript" />
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
