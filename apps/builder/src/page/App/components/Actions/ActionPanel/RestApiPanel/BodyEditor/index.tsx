import { RestAPIRawBodyInitial } from "@illa-public/public-configs"
import {
  ActionItem,
  RestAPIAction,
  RestAPIBodyContent,
  RestAPIBodyType,
  RestAPIRawBody,
} from "@illa-public/public-types"
import { Params } from "@illa-public/public-types"
import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Select } from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { RecordEditor } from "@/components/RecordEditor"
import { BodyEditorProps } from "@/page/App/components/Actions/ActionPanel/RestApiPanel/BodyEditor/interface"
import { getSelectedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import {
  bodyChooserStyle,
  bodyEditorContainerStyle,
  bodyLabelStyle,
  bodySelectorStyle,
  codeEditorStyle,
  restRecordKeyStyle,
  restRecordValueStyle,
} from "./style"

export const BodyEditor: FC<BodyEditorProps> = (props) => {
  const { t } = useTranslation()

  const actionItem = props.actionItem
  const bodyType = actionItem.content.bodyType
  const body = actionItem.content.body
  const isFormData = bodyType === "form-data"

  const selectedAction = useSelector(getSelectedAction) as ActionItem<
    RestAPIAction<RestAPIBodyContent>
  >
  const dispatch = useDispatch()

  let mode: CODE_LANG = CODE_LANG.JAVASCRIPT
  if (bodyType === "raw") {
    switch ((body as RestAPIRawBody).type) {
      case "text":
        mode = CODE_LANG.JAVASCRIPT
        break
      case "json":
        mode = CODE_LANG.JSON
        break
      case "xml":
        mode = CODE_LANG.XML
        break
      case "javascript":
        mode = CODE_LANG.JAVASCRIPT
        break
      case "html":
        mode = CODE_LANG.HTML
        break
    }
  }

  const handleActionTypeChange = useCallback(
    (value: string) => {
      let newBody = null
      const content =
        selectedAction?.content as RestAPIAction<RestAPIBodyContent>
      if (
        selectedAction.resourceID === actionItem.resourceID &&
        content.method !== "GET" &&
        content.bodyType !== "none" &&
        content.bodyType === value
      ) {
        newBody = content.body
      } else {
        switch (value) {
          case "none":
            newBody = null
            break
          case "x-www-form-urlencoded":
            newBody = [{ key: "", value: "" }] as Params[]
            break
          case "form-data":
            newBody = [{ key: "", type: "", value: "" }] as Params[]
            break
          case "raw":
            newBody = RestAPIRawBodyInitial
            break
          case "binary":
            newBody = ""
            break
        }
      }
      dispatch(
        configActions.updateCachedAction({
          ...actionItem,
          content: {
            ...actionItem.content,
            bodyType: value as RestAPIBodyType,
            body: newBody,
          },
        }),
      )
    },
    [actionItem, dispatch, selectedAction.content, selectedAction.resourceID],
  )

  const handleOnBodyChange = useCallback(
    (value: string | Params[]) => {
      dispatch(
        configActions.updateCachedAction({
          ...actionItem,
          content: {
            ...actionItem.content,
            body: value,
          },
        }),
      )
    },
    [actionItem, dispatch],
  )

  const handleRecordEditorValueChange = useCallback(
    (index: number, key: string, type: string, value: string) => {
      let newList: Params[] = [...(body as Params[])]
      newList[index] = isFormData
        ? { key, type, value }
        : ({ key, value } as Params)
      handleOnBodyChange(newList)
    },
    [body, handleOnBodyChange, isFormData],
  )

  const handleRawBodyTypeChange = useCallback(
    (value: string, paramName: string) => {
      dispatch(
        configActions.updateCachedAction({
          ...actionItem,
          content: {
            ...actionItem.content,
            body: {
              ...(body as RestAPIRawBody),
              [paramName]: value,
            },
          },
        }),
      )
    },
    [actionItem, body, dispatch],
  )

  const handleFormUrlencodedValueChange = (
    index: number,
    key: string,
    v: string,
  ) => {
    handleRecordEditorValueChange(index, key, "", v)
  }

  const handleOnAddKeys = useCallback(() => {
    const newListItem = (
      isFormData ? { key: "", type: "", value: "" } : { key: "", value: "" }
    ) as Params
    const newList: Params[] = [...(body as Params[]), newListItem]
    handleOnBodyChange(newList)
  }, [body, handleOnBodyChange, isFormData])

  const handleOnDeleteKeys = useCallback(
    (index: number) => {
      let newList: Params[] = [...(body as Params[])]
      const newListItem = (
        isFormData ? { key: "", type: "", value: "" } : { key: "", value: "" }
      ) as Params
      newList.splice(index, 1)
      if (newList.length === 0) {
        newList = [newListItem]
      }
      handleOnBodyChange(newList)
    },
    [body, handleOnBodyChange, isFormData],
  )

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
            bdRadius={bodyType === "raw" ? "8px 0 0 8px" : "8px"}
            onChange={(v) => handleActionTypeChange(v as string)}
          />
          {bodyType === "raw" && (
            <Select
              bdRadius="0 8px 8px 0"
              colorScheme="techPurple"
              w="162px"
              ml="-1px"
              value={(body as RestAPIRawBody).type}
              options={["text", "json", "xml", "javascript", "html"]}
              onChange={(val) => handleRawBodyTypeChange(val as string, "type")}
            />
          )}
        </div>
        {bodyType === "raw" && (
          <div css={codeEditorStyle}>
            <CodeEditor
              showLineNumbers
              lang={mode}
              value={(body as RestAPIRawBody).content}
              expectValueType={VALIDATION_TYPES.STRING}
              height="88px"
              onChange={(value) => handleRawBodyTypeChange(value, "content")}
            />
          </div>
        )}
        {bodyType === "x-www-form-urlencoded" && (
          <RecordEditor
            label=""
            name="body"
            records={body as Params[]}
            onChangeKey={handleFormUrlencodedValueChange}
            onChangeValue={handleFormUrlencodedValueChange}
            onDelete={handleOnDeleteKeys}
            onAdd={handleOnAddKeys}
          />
        )}
        {bodyType === "form-data" && (
          <RecordEditor
            label=""
            name="body"
            records={body as Params[]}
            customRender={(record, index) => {
              return (
                <>
                  <CodeEditor
                    value={record.key}
                    singleLine
                    height="32px"
                    onChange={(val) =>
                      handleRecordEditorValueChange(
                        index,
                        val,
                        record.type,
                        record.value,
                      )
                    }
                    wrapperCss={restRecordKeyStyle}
                    expectValueType={VALIDATION_TYPES.STRING}
                    lang={CODE_LANG.JAVASCRIPT}
                    placeholder="key"
                  />
                  <Select
                    colorScheme="techPurple"
                    showSearch={true}
                    defaultValue={record.type}
                    value={record.type}
                    w="0"
                    bdRadius="0"
                    flexGrow="1"
                    onChange={(val) =>
                      handleRecordEditorValueChange(
                        index,
                        record.key,
                        val as string,
                        record.value,
                      )
                    }
                    options={[
                      {
                        label: t(
                          "editor.action.panel.label.option.restapi.body_type.text",
                        ),
                        value: "text",
                      },
                      {
                        label: t(
                          "editor.action.panel.label.option.restapi.body_type.file",
                        ),
                        value: "file",
                      },
                    ]}
                  />
                  <CodeEditor
                    singleLine
                    expectValueType={
                      record.type === "file"
                        ? VALIDATION_TYPES.OBJECT
                        : VALIDATION_TYPES.STRING
                    }
                    value={record.value}
                    onChange={(val) =>
                      handleRecordEditorValueChange(
                        index,
                        record.key,
                        record.type,
                        val,
                      )
                    }
                    height="32px"
                    wrapperCss={restRecordValueStyle}
                    lang={CODE_LANG.JAVASCRIPT}
                    placeholder={
                      record.type === "file"
                        ? t(
                            "editor.action.panel.placeholder.restapi.body_type.file",
                          )
                        : "value"
                    }
                  />
                </>
              )
            }}
            onChangeKey={() => {}}
            onChangeValue={() => {}}
            onDelete={handleOnDeleteKeys}
            onAdd={handleOnAddKeys}
          />
        )}
        {bodyType === "binary" && (
          <div css={codeEditorStyle}>
            <CodeEditor
              lang={CODE_LANG.JAVASCRIPT}
              showLineNumbers
              value={(body as string) ?? ""}
              expectValueType={VALIDATION_TYPES.STRING}
              height="88px"
              onChange={handleOnBodyChange}
            />
          </div>
        )}
      </div>
    </div>
  )
}

BodyEditor.displayName = "BodyEditor"
