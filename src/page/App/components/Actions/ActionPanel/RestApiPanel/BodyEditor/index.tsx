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

export const BodyEditor: FC<BodyEditorProps> = (props) => {
  const {
    body,
    bodyType,
    onChangeBodyType,
    onChangeRawBodyType,
    onChangeBody,
  } = props
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
