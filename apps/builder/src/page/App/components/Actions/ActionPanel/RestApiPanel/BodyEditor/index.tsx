import { FC, useMemo, useState } from "react"
import {
  bodyChooserStyle,
  bodyEditorContainerStyle,
  bodyLabelStyle,
  bodySelectorStyle,
} from "./style"
import { useTranslation } from "react-i18next"
import { BodyEditorProps } from "@/page/App/components/Actions/ActionPanel/RestApiPanel/BodyEditor/interface"
import { Select } from "@illa-design/select"
import {
  BodyType,
  RawBody,
  RawBodyContent,
  RawBodyInitial,
  RawBodyType,
} from "@/redux/currentApp/action/restapiAction"
import { Controller } from "react-hook-form"
import { Params } from "@/redux/resource/restapiResource"
import { RecordEditor } from "@/page/App/components/Actions/ActionPanel/RecordEditor"
import { CodeEditor } from "@/components/CodeEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { EditorMode } from "@/components/CodeEditor/interface"

export const BodyEditor: FC<BodyEditorProps> = (props) => {
  const { body, bodyType, control } = props

  const [currentBodyType, setCurrentBodyType] = useState<BodyType>(bodyType)
  const [rawBodyType, setCurrentRawBodyType] = useState<RawBodyType>(
    bodyType === "raw" ? (body as RawBody<RawBodyContent>).type : "text",
  )

  const currentBody = useMemo(() => {
    switch (currentBodyType) {
      case "none":
        return null
      case "form-data":
        return bodyType === "form-data"
          ? (body as Params[])
          : ([{ key: "", value: "" }] as Params[])
      case "x-www-form-urlencoded":
        return bodyType === "x-www-form-urlencoded"
          ? (body as Params[])
          : ([{ key: "", value: "" }] as Params[])
      case "raw":
        return bodyType === "raw"
          ? (body as RawBody<RawBodyContent>)
          : RawBodyInitial
      case "binary":
        return bodyType === "binary" ? (body as string) : ""
      default:
        return null
    }
  }, [body, bodyType, currentBodyType])

  const { t } = useTranslation()
  return (
    <div css={bodyEditorContainerStyle}>
      <span css={bodyLabelStyle}>
        {t("editor.action.resource.restapi.label.body")}
      </span>
      <div css={bodyChooserStyle}>
        <div css={bodySelectorStyle}>
          <Controller
            name="restapiBodyType"
            control={control}
            defaultValue={bodyType}
            render={({ field: { onChange, value } }) => (
              <Select
                colorScheme="techPurple"
                value={value}
                options={[
                  "none",
                  "form-data",
                  "x-www-form-urlencoded",
                  "raw",
                  "binary",
                ]}
                bdRadius={bodyType === "raw" ? " 8px 0 0 8px" : "8px"}
                onChange={(value) => {
                  setCurrentBodyType(value)
                  onChange(value)
                }}
              />
            )}
          />
          {(currentBodyType === "form-data" ||
            currentBodyType === "x-www-form-urlencoded") && (
            <Controller
              defaultValue={currentBody}
              name="restapiBodyContentRecord"
              control={control}
              render={({ field: { value, onChange } }) => (
                <RecordEditor
                  label=""
                  records={value}
                  onChangeKey={(index, key, v) => {
                    let newList: Params[] = [...value]
                    newList[index] = { key, value: v } as Params
                    onChange(newList)
                  }}
                  onChangeValue={(index, key, v) => {
                    let newList: Params[] = [...value]
                    newList[index] = { key, value: v } as Params
                    onChange(newList)
                  }}
                  onDelete={(index, record) => {
                    let newList: Params[] = [...value]
                    newList.splice(index, 1)
                    onChange(newList)
                  }}
                  onAdd={() => {
                    let newList: Params[] = [
                      ...value,
                      { key: "", value: "" } as Params,
                    ]
                    onChange(newList)
                  }}
                />
              )}
            />
          )}
          {currentBodyType === "binary" && (
            <Controller
              defaultValue={currentBody}
              render={({ field: { value, onChange } }) => (
                <CodeEditor
                  mode="TEXT_JS"
                  lineNumbers
                  value={value}
                  expectedType={VALIDATION_TYPES.STRING}
                  height="88px"
                  onChange={(value) => {
                    onChange(value)
                  }}
                />
              )}
              name="restapiBodyContentBinary"
              control={control}
            />
          )}
          {currentBodyType === "raw" && (
            <>
              <Controller
                name="restapiBody"
                control={control}
                defaultValue={rawBodyType}
                render={({ field: { onChange, value } }) => (
                  <Select
                    bdRadius="0 8px 8px 0"
                    colorScheme="techPurple"
                    width="162px"
                    value={value}
                    options={["text", "json", "xml", "javascript", "html"]}
                    onChange={(value) => {
                      setCurrentRawBodyType(value)
                      onChange(value)
                    }}
                  />
                )}
              />
              <Controller
                control={control}
                defaultValue={(currentBody as RawBody<RawBodyContent>).content}
                name="restapiBodyContentRaw"
                render={({ field: { value, onChange } }) => {
                  let mode: EditorMode = "TEXT_JS"
                  switch (rawBodyType) {
                    case "text":
                      mode = "TEXT_JS"
                      break
                    case "json":
                      mode = "JSON"
                      break
                    case "xml":
                      mode = "XML_JS"
                      break
                    case "javascript":
                      mode = "JAVASCRIPT"
                      break
                    case "html":
                      mode = "HTML_JS"
                      break
                  }
                  return (
                    <CodeEditor
                      lineNumbers
                      mode={mode}
                      value={value}
                      expectedType={VALIDATION_TYPES.STRING}
                      height="88px"
                      onChange={(value) => {
                        onChange(value)
                      }}
                    />
                  )
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

BodyEditor.displayName = "BodyEditor"
