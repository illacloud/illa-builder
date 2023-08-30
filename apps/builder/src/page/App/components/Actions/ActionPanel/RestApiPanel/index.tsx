import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Select, SelectValue, Trigger } from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { RecordEditor } from "@/components/RecordEditor"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { BodyEditor } from "@/page/App/components/Actions/ActionPanel/RestApiPanel/BodyEditor"
import {
  actionItemContainer,
  restapiItemInputStyle,
  restapiItemLabelStyle,
  restapiItemStyle,
  restapiPanelContainerStyle,
  urlStyle,
} from "@/page/App/components/Actions/ActionPanel/RestApiPanel/style"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { ActionItem, ActionType } from "@/redux/currentApp/action/actionState"
import {
  ApiMethod,
  BodyContent,
  BodyType,
  RestApiAction,
} from "@/redux/currentApp/action/restapiAction"
import { HuggingFaceResource } from "@/redux/resource/huggingFaceResource"
import { Resource } from "@/redux/resource/resourceState"
import {
  Params,
  RestApiAuth,
  RestApiResource,
} from "@/redux/resource/restapiResource"
import { RootState } from "@/store"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

const huggingFaceMethodSelectOptions: ApiMethod[] = ["POST"]
const resetAPIMethodSelectOptions: ApiMethod[] = [
  "GET",
  "POST",
  "PUT",
  "HEAD",
  "PATCH",
  "DELETE",
  "OPTIONS",
]

const getMethod = (actionType: ActionType) => {
  switch (actionType) {
    case "huggingface":
      return huggingFaceMethodSelectOptions
    case "restapi":
    default:
      return resetAPIMethodSelectOptions
  }
}

const RestApiPanel: FC = () => {
  const { t } = useTranslation()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    RestApiAction<BodyContent>
  >
  const selectedAction = useSelector(getSelectedAction) as ActionItem<
    RestApiAction<BodyContent>
  >
  const isHuggingFace = cachedAction.actionType === "huggingface"
  const content = cachedAction.content as RestApiAction<BodyContent>
  const dispatch = useDispatch()

  const currentResource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceID === cachedAction?.resourceID)
  })

  const handleChangeMethod = useCallback(
    (value?: SelectValue) => {
      let newBodyType: BodyType = "none"
      let newBody = null

      if (value !== "GET") {
        if (
          selectedAction.resourceID === cachedAction.resourceID &&
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
            method: value as ApiMethod,
            bodyType: newBodyType,
            body: newBody,
          },
        }),
      )
    },
    [
      cachedAction,
      content,
      dispatch,
      selectedAction.content.body,
      selectedAction.content.bodyType,
      selectedAction.content.method,
      selectedAction.resourceID,
    ],
  )

  return (
    <div css={restapiPanelContainerStyle}>
      <ResourceChoose />
      <div css={actionItemContainer}>
        <div css={restapiItemStyle}>
          <span css={restapiItemLabelStyle}>
            {t("editor.action.resource.restapi.label.action_type")}
          </span>
          <Select
            colorScheme="techPurple"
            ml="16px"
            value={content.method}
            w="160px"
            maxW="160px"
            options={getMethod(cachedAction.actionType)}
            onChange={handleChangeMethod}
          />
          <Trigger
            position="top-start"
            content={
              currentResource?.content
                ? isHuggingFace
                  ? (currentResource as Resource<HuggingFaceResource>).content
                      .baseURL
                  : (currentResource as Resource<RestApiResource<RestApiAuth>>)
                      .content.baseUrl
                : ""
            }
          >
            <div css={urlStyle}>
              {currentResource?.content
                ? isHuggingFace
                  ? (currentResource as Resource<HuggingFaceResource>).content
                      .baseURL
                  : (currentResource as Resource<RestApiResource<RestApiAuth>>)
                      .content.baseUrl
                : ""}
            </div>
          </Trigger>
          <CodeEditor
            singleLine
            wrapperCss={restapiItemInputStyle}
            expectValueType={VALIDATION_TYPES.STRING}
            value={content.url}
            placeholder={t("editor.action.form.placeholder.url")}
            lang={CODE_LANG.JAVASCRIPT}
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
          onDelete={(index, _record) => {
            let newList: Params[] = [...content.urlParams]
            newList.splice(index, 1)
            if (newList.length === 0) {
              newList = [{ key: "", value: "" }]
            }
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
          onDelete={(index) => {
            let newList: Params[] = [...content.headers]
            newList.splice(index, 1)
            if (newList.length === 0) {
              newList = [{ key: "", value: "" }]
            }
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
          onDelete={(index) => {
            let newList: Params[] = [...content.cookies]
            newList.splice(index, 1)
            if (newList.length === 0) {
              newList = [{ key: "", value: "" }]
            }
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
        {!["GET", "HEAD"].includes(content.method) && (
          <BodyEditor actionItem={cachedAction} />
        )}
        <TransformerComponent />
      </div>
      <ActionEventHandler />
    </div>
  )
}

RestApiPanel.displayName = "RestApiPanel"
export default RestApiPanel
