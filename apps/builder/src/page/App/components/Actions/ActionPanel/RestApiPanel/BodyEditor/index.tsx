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
  const { content, control } = props

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
            defaultValue={content.bodyType}
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
                bdRadius={content.bodyType === "raw" ? " 8px 0 0 8px" : "8px"}
                onChange={(value) => {
                  onChange(value)
                }}
              />
            )}
          />
          {content.bodyType === "raw" && (
            <Controller
              name="restapiRawBodyType"
              control={control}
              defaultValue={(content.body as RawBody<RawBodyContent>).type}
              render={({ field: { onChange, value } }) => (
                <Select
                  bdRadius="0 8px 8px 0"
                  colorScheme="techPurple"
                  width="162px"
                  ml="-1px"
                  value={value}
                  options={["text", "json", "xml", "javascript", "html"]}
                  onChange={(value) => {
                    onChange(value)
                  }}
                />
              )}
            />
          )}
        </div>
        {content.bodyType === "raw" && (
          <Controller
            control={control}
            defaultValue={(content.body as RawBody<RawBodyContent>).content}
            name="restapiRawBodyContent"
            render={({ field: { value, onChange } }) => {
              let mode: EditorMode = "TEXT_JS"
              switch ((content.body as RawBody<RawBodyContent>).type) {
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
        )}
        {(content.bodyType === "form-data" ||
          content.bodyType === "x-www-form-urlencoded") && (
          <Controller
            defaultValue={content.body}
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
        {content.bodyType === "binary" && (
          <Controller
            defaultValue={content.body}
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
      </div>
    </div>
  )
}

BodyEditor.displayName = "BodyEditor"
