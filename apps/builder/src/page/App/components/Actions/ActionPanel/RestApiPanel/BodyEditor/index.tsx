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
import { Params } from "@/redux/resource/restapiResource"
import { RecordEditor } from "@/page/App/components/Actions/ActionPanel/RecordEditor"
import { CodeEditor } from "@/components/CodeEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { EditorMode } from "@/components/CodeEditor/interface"
import { useDispatch, useSelector } from "react-redux"
import { configActions } from "@/redux/config/configSlice"
import {
  RawBody,
  RawBodyContent,
} from "@/redux/currentApp/action/restapiAction"
import { getSelectedAction } from "@/redux/config/configSelector"

export const BodyEditor: FC<BodyEditorProps> = (props) => {
  const { t } = useTranslation()
  const selectedAction = useSelector(getSelectedAction)

  const actionItem = props.actionItem

  const bodyType = actionItem.content.bodyType

  const body = actionItem.content.body

  const dispatch = useDispatch()

  let mode: EditorMode = "TEXT_JS"
  if (bodyType === "raw") {
    switch ((body as RawBody<RawBodyContent>).type) {
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
  }

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
              let newBody = null

              if (value === "raw") {
              }

              dispatch(
                configActions.updateCachedAction({
                  ...actionItem,
                  content: {
                    ...actionItem.content,
                    bodyType: value,
                    body: newBody,
                  },
                }),
              )
            }}
          />
          {bodyType === "raw" && (
            <Select
              bdRadius="0 8px 8px 0"
              colorScheme="techPurple"
              width="162px"
              ml="-1px"
              value={(body as RawBody<RawBodyContent>).type}
              options={["text", "json", "xml", "javascript", "html"]}
              onChange={(value) => {
                dispatch(
                  configActions.updateCachedAction({
                    ...actionItem,
                    content: {
                      ...actionItem.content,
                      body: {
                        ...(body as RawBody<RawBodyContent>),
                        type: value,
                      },
                    },
                  }),
                )
              }}
            />
          )}
        </div>
        {bodyType === "raw" && (
          <CodeEditor
            lineNumbers
            mode={mode}
            value={(body as RawBody<RawBodyContent>).content}
            expectedType={VALIDATION_TYPES.STRING}
            height="88px"
            onChange={(value) => {
              dispatch(
                configActions.updateCachedAction({
                  ...actionItem,
                  content: {
                    ...actionItem.content,
                    body: {
                      ...(body as RawBody<RawBodyContent>),
                      content: value,
                    },
                  },
                }),
              )
            }}
          />
        )}
        {(bodyType === "form-data" || bodyType === "x-www-form-urlencoded") && (
          <RecordEditor
            label=""
            records={body as Params[]}
            onChangeKey={(index, key, v) => {
              let newList: Params[] = [...(body as Params[])]
              newList[index] = { key, value: v } as Params
              dispatch(
                configActions.updateCachedAction({
                  ...actionItem,
                  content: {
                    ...actionItem.content,
                    body: newList,
                  },
                }),
              )
            }}
            onChangeValue={(index, key, v) => {
              let newList: Params[] = [...(body as Params[])]
              newList[index] = { key, value: v } as Params
              dispatch(
                configActions.updateCachedAction({
                  ...actionItem,
                  content: {
                    ...actionItem.content,
                    body: newList,
                  },
                }),
              )
            }}
            onDelete={(index, record) => {
              let newList: Params[] = [...(body as Params[])]
              newList.splice(index, 1)
              dispatch(
                configActions.updateCachedAction({
                  ...actionItem,
                  content: {
                    ...actionItem.content,
                    body: newList,
                  },
                }),
              )
            }}
            onAdd={() => {
              let newList: Params[] = [
                ...(body as Params[]),
                { key: "", value: "" } as Params,
              ]
              dispatch(
                configActions.updateCachedAction({
                  ...actionItem,
                  content: {
                    ...actionItem.content,
                    body: newList,
                  },
                }),
              )
            }}
          />
        )}
        {bodyType === "binary" && (
          <CodeEditor
            mode="TEXT_JS"
            lineNumbers
            value={(body as string) ?? ""}
            expectedType={VALIDATION_TYPES.STRING}
            height="88px"
            onChange={(value) => {
              dispatch(
                configActions.updateCachedAction({
                  ...actionItem,
                  content: {
                    ...actionItem.content,
                    body: value,
                  },
                }),
              )
            }}
          />
        )}
      </div>
    </div>
  )
}

BodyEditor.displayName = "BodyEditor"
