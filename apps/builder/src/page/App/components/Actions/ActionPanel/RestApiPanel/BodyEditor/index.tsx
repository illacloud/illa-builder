import { FC } from "react"
import {
  bodyChooserStyle,
  bodyEditorContainerStyle,
  bodyLabelStyle,
  bodySelectorStyle,
} from "./style"
import { useTranslation } from "react-i18next"
import { BodyEditorProps } from "@/page/App/components/Actions/ActionPanel/RestApiPanel/BodyEditor/interface"
import { Select } from "@illa-design/select"
import { Controller } from "react-hook-form"
import { Params } from "@/redux/resource/restapiResource"
import { RecordEditor } from "@/page/App/components/Actions/ActionPanel/RecordEditor"
import { CodeEditor } from "@/components/CodeEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { EditorMode } from "@/components/CodeEditor/interface"

export const BodyEditor: FC<BodyEditorProps> = (props) => {
  const { control } = props

  const { t } = useTranslation()
  return (
    <Controller
      name="bodyType"
      control={control}
      render={({ field: { onChange, value: bodyType } }) => {
        return (
          <div css={bodyEditorContainerStyle}>
            <span css={bodyLabelStyle}>
              {t("editor.action.resource.restapi.label.body")}
            </span>
            <div css={bodyChooserStyle}>
              <div css={bodySelectorStyle}>
                <Select
                  colorScheme="techPurple"
                  value={bodyType}
                  options={[
                    "none",
                    "form-data",
                    "x-www-form-urlencoded",
                    "raw",
                    "binary",
                  ]}
                  bdRadius={bodyType === "raw" ? " 8px 0 0 8px" : "8px"}
                  onChange={(value) => {
                    onChange(value)
                  }}
                />
                {bodyType === "raw" && (
                  <Controller
                    name="body.type"
                    control={control}
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
              {bodyType === "raw" && (
                <Controller
                  control={control}
                  name="body.type"
                  render={({ field: { value, onChange } }) => {
                    let mode: EditorMode = "TEXT_JS"
                    switch (value ?? "text") {
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
                      <Controller
                        render={({ field: { value: c } }) => (
                          <CodeEditor
                            lineNumbers
                            mode={mode}
                            value={c}
                            expectedType={VALIDATION_TYPES.STRING}
                            height="88px"
                            onChange={(value) => {
                              onChange(value)
                            }}
                          />
                        )}
                        name="body.content"
                      />
                    )
                  }}
                />
              )}
              {(bodyType === "form-data" ||
                bodyType === "x-www-form-urlencoded") && (
                <Controller
                  name="body"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <RecordEditor
                      label=""
                      records={value as Params[]}
                      onChangeKey={(index, key, v) => {
                        let newList: Params[] = [...(value as Params[])]
                        newList[index] = { key, value: v } as Params
                        onChange(newList)
                      }}
                      onChangeValue={(index, key, v) => {
                        let newList: Params[] = [...(value as Params[])]
                        newList[index] = { key, value: v } as Params
                        onChange(newList)
                      }}
                      onDelete={(index, record) => {
                        let newList: Params[] = [...(value as Params[])]
                        newList.splice(index, 1)
                        onChange(newList)
                      }}
                      onAdd={() => {
                        let newList: Params[] = [
                          ...(value as Params[]),
                          { key: "", value: "" } as Params,
                        ]
                        onChange(newList)
                      }}
                    />
                  )}
                />
              )}
              {bodyType === "binary" && (
                <Controller
                  render={({ field: { value, onChange } }) => (
                    <CodeEditor
                      mode="TEXT_JS"
                      lineNumbers
                      value={value as string}
                      expectedType={VALIDATION_TYPES.STRING}
                      height="88px"
                      onChange={(value) => {
                        onChange(value)
                      }}
                    />
                  )}
                  name="body"
                  control={control}
                />
              )}
            </div>
          </div>
        )
      }}
    />
  )
}

BodyEditor.displayName = "BodyEditor"
