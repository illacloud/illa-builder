import { FC, useCallback } from "react"
import { Controller, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { Select } from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import { redisContainerStyle } from "@/page/App/components/Actions/ActionPanel/RedisPanel/style"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { RecordEditor } from "@/page/App/components/Actions/ActionPanel/RecordEditor"
import { GraphQLAction, Params } from "@/redux/currentApp/action/graphqlAction"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import { useTranslation } from "react-i18next"
import { InputEditor } from "@/page/App/components/InputEditor"
import { recordKeyStyle, recordValueStyle } from "./style"

export const GraphQLPanel: FC = () => {
  const { t } = useTranslation()

  const cachedAction = useSelector(getCachedAction) as ActionItem<GraphQLAction>
  const cachedContent = cachedAction.content as GraphQLAction
  const selectedAction = useSelector(
    getSelectedAction,
  ) as ActionItem<GraphQLAction>
  const selectedContent = selectedAction.content as GraphQLAction
  const { control, getValues } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })

  const content =
    selectedAction.actionType === cachedAction.actionType
      ? selectedContent
      : cachedContent

  const dispatch = useDispatch()

  const handleValueChange = useCallback(
    (value: string | Params[], name: string) => {
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...content,
            [name]: value,
          },
        }),
      )
    },
    [cachedAction, content, dispatch],
  )

  const handleRecordChange = useCallback(
    (
      name: string,
      key: string,
      value: string,
      index: number,
      onChange: (...event: any[]) => void,
    ) => {
      const curValue = getValues()[name]
      let newRecords: Params[] = [...curValue]
      newRecords[index] = {
        key,
        value,
      }
      onChange(newRecords)
      handleValueChange(newRecords, name)
    },
    [getValues, handleValueChange],
  )

  return (
    <div css={redisContainerStyle}>
      <ResourceChoose />
      <InputEditor
        lineNumbers
        title={t("editor.action.panel.graphql.query")}
        placeholder={t("editor.action.panel.graphql.placeholder.query")}
        value={content.query}
        onChange={(value) => handleValueChange(value, "query")}
        mode={"GRAPHQL"}
        style={{ height: "88px" }}
        expectedType={VALIDATION_TYPES.STRING}
      />
      <Controller
        control={control}
        defaultValue={
          content.variables || [
            {
              key: "",
              value: "",
            },
          ]
        }
        render={({ field: { value, onChange } }) => {
          return (
            <RecordEditor
              label={t("editor.action.panel.graphql.variables")}
              records={value}
              customRender={(record, index) => (
                <>
                  <Select
                    css={recordKeyStyle}
                    colorScheme="techPurple"
                    allowClear={true}
                    defaultValue={record.condition}
                    value={record.condition}
                    bdRadius="8px 0 0 8px"
                    onChange={(val: string) =>
                      handleRecordChange(
                        "variables",
                        val,
                        record.value,
                        index,
                        onChange,
                      )
                    }
                    options={[]}
                  />
                  <CodeEditor
                    css={recordValueStyle}
                    height="32px"
                    mode="TEXT_JS"
                    placeholder="value"
                    value={record.value}
                    borderRadius="0"
                    onChange={(val) =>
                      handleRecordChange(
                        "variables",
                        record.key,
                        val,
                        index,
                        onChange,
                      )
                    }
                    expectedType={VALIDATION_TYPES.STRING}
                  />
                </>
              )}
              onAdd={() => {
                onChange([...value, { key: "", value: "" }])
              }}
              onDelete={(index, record) => {
                let newRecords = [...value]
                newRecords.splice(index, 1)
                if (newRecords.length === 0) {
                  newRecords = [{ key: "", value: "" }]
                }
                onChange(newRecords)
              }}
              onChangeKey={() => {}}
              onChangeValue={() => {}}
            />
          )
        }}
        name={"variables"}
      />
      <Controller
        control={control}
        defaultValue={
          content.headers || [
            {
              key: "",
              value: "",
            },
          ]
        }
        render={({ field: { value, onChange } }) => {
          return (
            <RecordEditor
              label={t("editor.action.panel.graphql.headers")}
              records={value}
              onAdd={() => {
                onChange([...value, { key: "", value: "" }])
              }}
              onDelete={(index, record) => {
                let newRecords = [...value]
                newRecords.splice(index, 1)
                if (newRecords.length === 0) {
                  newRecords = [{ key: "", value: "" }]
                }
                onChange(newRecords)
              }}
              onChangeKey={(index, key, value) =>
                handleRecordChange("headers", key, value, index, onChange)
              }
              onChangeValue={(index, key, value) =>
                handleRecordChange("headers", key, value, index, onChange)
              }
            />
          )
        }}
        name={"headers"}
      />
      <TransformerComponent />
      <ActionEventHandler />
    </div>
  )
}

GraphQLPanel.displayName = "GraphQLPanel"
