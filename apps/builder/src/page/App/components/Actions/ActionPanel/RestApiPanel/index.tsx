import { FC } from "react"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import {
  restapiItemInputStyle,
  restapiItemLabelStyle,
  restapiItemStyle,
  restapiPanelContainerStyle,
  topDivider,
} from "./style"
import { useTranslation } from "react-i18next"
import { Select, Input } from "@illa-design/react"
import { useDispatch, useSelector } from "react-redux"
import { CodeEditor } from "@/components/CodeEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { RecordEditor } from "@/page/App/components/Actions/ActionPanel/RecordEditor"
import { BodyEditor } from "@/page/App/components/Actions/ActionPanel/RestApiPanel/BodyEditor"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import {
  BodyContent,
  RestApiAction,
} from "@/redux/currentApp/action/restapiAction"
import { RootState } from "@/store"
import { Resource } from "@/redux/resource/resourceState"
import {
  Params,
  RestApiAuth,
  RestApiResource,
} from "@/redux/resource/restapiResource"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"

export const RestApiPanel: FC = () => {
  const { t } = useTranslation()

  const cachedAction = useSelector(getCachedAction)!!
  const selectedAction = useSelector(getSelectedAction)!!

  const content = cachedAction.content as RestApiAction<BodyContent>
  const dispatch = useDispatch()

  const currentResource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceId === cachedAction?.resourceId)
  })

  return (
    <div css={restapiPanelContainerStyle}>
      <ResourceChoose />
      <div css={topDivider} />
      <div css={restapiItemStyle}>
        <span css={restapiItemLabelStyle}>
          {t("editor.action.resource.restapi.label.action_type")}
        </span>
        <Select
          colorScheme="techPurple"
          ml="16px"
          value={content.method}
          width="160px"
          maxW="160px"
          options={["GET", "POST", "PUT", "PATCH", "DELETE"]}
          onChange={(value) => {
            let newBodyType = "none"
            let newBody = null

            if (value !== "GET") {
              if (
                selectedAction.resourceId === cachedAction.resourceId &&
                selectedAction.content.method === value
              ) {
                newBodyType = selectedAction.content.bodyType
                newBody = selectedAction.content.body
              }
            }

            dispatch(
              configActions.updateCachedAction({
                ...cachedAction,
                content: {
                  ...content,
                  method: value,
                  bodyType: newBodyType,
                  body: newBody,
                },
              }),
            )
          }}
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
        <CodeEditor
          borderRadius="0 8px 8px 0"
          css={restapiItemInputStyle}
          expectedType={VALIDATION_TYPES.STRING}
          value={content.url}
          mode="TEXT_JS"
          onChange={(value) => {
            dispatch(
              configActions.updateCachedAction({
                ...cachedAction,
                content: {
                  ...content,
                  url: value,
                },
              }),
            )
          }}
        />
      </div>

      <RecordEditor
        records={content.urlParams}
        label={t("editor.action.resource.restapi.label.url_parameters")}
        onChangeKey={(index, key, v) => {
          let newList: Params[] = [...content.urlParams]
          newList[index] = { key, value: v } as Params
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...content,
                urlParams: newList,
              },
            }),
          )
        }}
        onChangeValue={(index, key, v) => {
          let newList: Params[] = [...content.urlParams]
          newList[index] = { key, value: v } as Params
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...content,
                urlParams: newList,
              },
            }),
          )
        }}
        onDelete={(index, record) => {
          let newList: Params[] = [...content.urlParams]
          newList.splice(index, 1)
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...content,
                urlParams: newList,
              },
            }),
          )
        }}
        onAdd={() => {
          let newList: Params[] = [
            ...content.urlParams,
            { key: "", value: "" } as Params,
          ]
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...content,
                urlParams: newList,
              },
            }),
          )
        }}
      />
      <RecordEditor
        records={content.headers}
        label={t("editor.action.resource.restapi.label.headers")}
        onChangeKey={(index, key, v) => {
          let newList: Params[] = [...content.headers]
          newList[index] = { key, value: v } as Params
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...content,
                headers: newList,
              },
            }),
          )
        }}
        onChangeValue={(index, key, v) => {
          let newList: Params[] = [...content.headers]
          newList[index] = { key, value: v } as Params
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...content,
                headers: newList,
              },
            }),
          )
        }}
        onDelete={(index, record) => {
          let newList: Params[] = [...content.headers]
          newList.splice(index, 1)
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...content,
                headers: newList,
              },
            }),
          )
        }}
        onAdd={() => {
          let newList: Params[] = [
            ...content.headers,
            { key: "", value: "" } as Params,
          ]
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...content,
                headers: newList,
              },
            }),
          )
        }}
      />
      <RecordEditor
        records={content.cookies}
        label={t("editor.action.resource.restapi.label.cookies")}
        onChangeKey={(index, key, v) => {
          let newList: Params[] = [...content.cookies]
          newList[index] = { key, value: v } as Params
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...content,
                cookies: newList,
              },
            }),
          )
        }}
        onChangeValue={(index, key, v) => {
          let newList: Params[] = [...content.cookies]
          newList[index] = { key, value: v } as Params
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...content,
                cookies: newList,
              },
            }),
          )
        }}
        onDelete={(index, record) => {
          let newList: Params[] = [...content.cookies]
          newList.splice(index, 1)
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...content,
                cookies: newList,
              },
            }),
          )
        }}
        onAdd={() => {
          let newList: Params[] = [
            ...content.cookies,
            { key: "", value: "" } as Params,
          ]
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...content,
                cookies: newList,
              },
            }),
          )
        }}
      />
      {content.method !== "GET" && <BodyEditor actionItem={cachedAction} />}
      <TransformerComponent />
      <ActionEventHandler />
    </div>
  )
}

RestApiPanel.displayName = "RestApiPanel"
