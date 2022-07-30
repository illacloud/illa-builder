import { FC, ReactNode } from "react"
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
  BodyContent,
  BodyType,
  FormDataBody,
  RawBody,
  RawBodyContent,
  XWWWFormURLEncodedBody,
} from "@/redux/currentApp/action/restapiAction"
import { RecordEditor } from "@/page/App/components/Actions/ActionPanel/RecordEditor"
import { CodeEditor } from "@/components/CodeEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

function getBodyEditorComponent(
  bodyType: BodyType,
  body: BodyContent,
): ReactNode {
  switch (bodyType) {
    case "none":
      return null
    case "form-data":
      return (
        <RecordEditor
          label=""
          records={body as FormDataBody}
          onAdd={() => {}}
          onDelete={() => {}}
          onChangeKey={() => {}}
          onChangeValue={() => {}}
        />
      )
    case "x-www-form-urlencoded":
      return (
        <RecordEditor
          label=""
          records={body as XWWWFormURLEncodedBody}
          onAdd={() => {}}
          onDelete={() => {}}
          onChangeKey={() => {}}
          onChangeValue={() => {}}
        />
      )
    case "raw":
      break
    case "binary":
      return (
        <CodeEditor
          mode="TEXT_JS"
          expectedType={VALIDATION_TYPES.STRING}
          height="88px"
        />
      )
  }
}

export const BodyEditor: FC<BodyEditorProps> = (props) => {
  const { body, bodyType, onChangeBodyType, onChangeRawBodyType } = props
  const { t } = useTranslation()

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
            borderRadius={bodyType === "raw" ? " 8px 0 0 8px" : "8px"}
            onChange={(value) => {
              onChangeBodyType(value)
            }}
          />
          {bodyType === "raw" && (
            <Select
              borderRadius="0 8px 8px 0"
              colorScheme="techPurple"
              width="162px"
              value={(body as RawBody<RawBodyContent>).type}
              options={["text", "json", "xml", "javascript", "html"]}
              onChange={(value) => {
                onChangeRawBodyType(value)
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

BodyEditor.displayName = "BodyEditor"
