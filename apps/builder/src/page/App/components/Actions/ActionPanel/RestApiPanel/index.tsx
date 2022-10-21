import { FC, useEffect, useState } from "react"
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
import { useDispatch, useSelector } from "react-redux"
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
  RawBody,
  RawBodyContent,
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
import { configActions } from "@/redux/config/configSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"

export const RestApiPanel: FC = () => {
  const { t } = useTranslation()

  const cachedAction = useSelector(getCachedAction)

  const content = cachedAction?.content
    ? (cachedAction.content as RestApiAction<BodyContent>)
    : RestApiActionInitial

  const currentResource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceId === cachedAction?.resourceId)
  })

  const { control, watch, getValues } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })

  const dispatch = useDispatch()

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (cachedAction) {
        const newAction: ActionItem<RestApiAction<BodyContent>> = {
          ...(cachedAction as ActionItem<RestApiAction<BodyContent>>),
        }

        const data = getValues()

        let body
        switch (newAction.content.bodyType) {
          case "none":
            body = null
            break
          case "form-data":
          case "x-www-form-urlencoded":
            body = data.restapiBodyContentRecord
            break
          case "raw":
            body = {
              type: data.restapiRawBodyType,
              content: data.restapiRawBodyContent,
            } as RawBody<RawBodyContent>
            break
          case "binary":
            body = data.restapiBodyContentBinary
            break
        }

        newAction.content = {
          ...newAction.content,
          url: data.restapiUrl,
          method: data.restapiMethod,
          urlParams: data.restapiUrlParams,
          headers: data.restapiHeaders,
          cookies: data.restapiCookies,
          bodyType:
            data.restapiMethod === "GET" ? "none" : data.restapiBodyType,
          body: body,
        }

        dispatch(configActions.updateCachedAction(newAction))
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, getValues, cachedAction, dispatch])

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
          value={
            currentResource?.content
              ? (currentResource as Resource<RestApiResource<RestApiAuth>>)
                  .content.baseUrl
              : ""
          }
          ml="8px"
          readOnly
        />
        <Controller
          name="restapiUrl"
          control={control}
          defaultValue={content.url}
          render={({ field: { value, onChange } }) => (
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
        render={({ field: { onChange, value } }) => (
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
