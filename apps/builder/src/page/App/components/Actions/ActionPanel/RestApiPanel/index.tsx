import { FC, useState } from "react"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import {
  restapiItemInputStyle,
  restapiItemLabelStyle,
  restapiItemStyle,
  restapiPanelContainerStyle,
  topDivider,
} from "./style"
import { useTranslation } from "react-i18next"
import { Select } from "@illa-design/select"
import { useSelector } from "react-redux"
import { CodeEditor } from "@/components/CodeEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { Input } from "@illa-design/input"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { RecordEditor } from "@/page/App/components/Actions/ActionPanel/RecordEditor"
import { BodyEditor } from "@/page/App/components/Actions/ActionPanel/RestApiPanel/BodyEditor"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import {
  ApiMethod,
  BodyContent,
  RestApiAction,
  RestApiActionInitial,
} from "@/redux/currentApp/action/restapiAction"
import { RootState } from "@/store"
import { Resource } from "@/redux/resource/resourceState"
import {
  Params,
  RestApiAuth,
  RestApiResource,
} from "@/redux/resource/restapiResource"
import { Controller, useForm } from "react-hook-form"
import { getCachedAction } from "@/redux/config/configSelector"

export const RestApiPanel: FC = () => {
  const { t } = useTranslation()

  const cachedAction = useSelector(getCachedAction)

  const content = cachedAction?.content
    ? (cachedAction.content as RestApiAction<BodyContent>)
    : RestApiActionInitial

  const currentResource = useSelector((state: RootState) => {
    return state.resource.find(
      (r) => r.resourceId === cachedAction?.resourceId,
    ) as Resource<RestApiResource<RestApiAuth>>
  })

  const { control } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })

  const [currentMethod, setCurrentMethod] = useState<ApiMethod>(content.method)

  return (
    <div css={restapiPanelContainerStyle}>
      <ResourceChoose />
      <div css={topDivider} />
      <div css={restapiItemStyle}>
        <span css={restapiItemLabelStyle}>
          {t("editor.action.resource.restapi.label.action_type")}
        </span>
        <Controller
          name="restapiMethod"
          control={control}
          defaultValue={currentMethod}
          render={({ field: { value, onChange }, fieldState, formState }) => (
            <Select
              colorScheme="techPurple"
              ml="16px"
              value={value}
              width="160px"
              maxW="160px"
              options={["GET", "POST", "PUT", "PATCH", "DELETE"]}
              onChange={(value) => {
                setCurrentMethod(value)
                onChange(value)
              }}
            />
          )}
        />
        <Input
          minW="230px"
          maxW="500px"
          borderColor="techPurple"
          bdRadius="8px 0 0 8px"
          value={currentResource.content.baseUrl}
          ml="8px"
          readOnly
        />
        <Controller
          name="restapiUrl"
          control={control}
          defaultValue={content.url}
          render={({ field: { value, onChange }, fieldState, formState }) => (
            <CodeEditor
              borderRadius="0 8px 8px 0"
              css={restapiItemInputStyle}
              expectedType={VALIDATION_TYPES.STRING}
              value={value}
              mode="TEXT_JS"
              onChange={(value) => {
                onChange(value)
              }}
            />
          )}
        />
      </div>

      <Controller
        name="restapiUrlParams"
        control={control}
        defaultValue={content.urlParams}
        render={({ field: { onChange, value }, fieldState, formState }) => (
          <RecordEditor
            records={value}
            label={t("editor.action.resource.restapi.label.url_parameters")}
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

      <Controller
        name="restapiHeaders"
        defaultValue={content.headers}
        control={control}
        render={({ field: { onChange, value } }) => (
          <RecordEditor
            records={value}
            label={t("editor.action.resource.restapi.label.headers")}
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
      <Controller
        name="restapiCookies"
        defaultValue={content.cookies}
        control={control}
        render={({ field: { value, onChange } }) => (
          <RecordEditor
            records={value}
            label={t("editor.action.resource.restapi.label.cookies")}
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
      {currentMethod !== "GET" && (
        <BodyEditor control={control} content={content} />
      )}
      <TransformerComponent />
      <ActionEventHandler />
    </div>
  )
}

RestApiPanel.displayName = "RestApiPanel"
