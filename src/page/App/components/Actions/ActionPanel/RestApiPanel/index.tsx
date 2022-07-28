import { FC } from "react"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import {
  restApiItemBaseUrlStyle,
  restapiItemInputStyle,
  restapiItemLabelStyle,
  restApiItemSelectStyle,
  restapiItemStyle,
  restapiPanelContainerStyle,
} from "./style"
import { useTranslation } from "react-i18next"
import { Select } from "@illa-design/select"
import { useDispatch } from "react-redux"
import { configActions } from "@/redux/config/configSlice"
import { CodeEditor } from "@/components/CodeEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { Input } from "@illa-design/input"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { RestApiPanelProps } from "@/page/App/components/Actions/ActionPanel/interface"
import store from "@/store"
import {
  Params,
  Resource,
  RestApiAuth,
  RestApiResource,
} from "@/redux/resource/resourceState"
import { RecordEditor } from "@/page/App/components/Actions/ActionPanel/RecordEditor"

export const RestApiPanel: FC<RestApiPanelProps> = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const currentAction = props.action

  const currentContent = props.action.content

  const currentResource = store
    .getState()
    .resource.find(
      (r) => r.resourceId === currentAction.resourceId,
    ) as Resource<RestApiResource<RestApiAuth>>

  return (
    <div css={restapiPanelContainerStyle}>
      <ResourceChoose action={currentAction} />
      <div css={restapiItemStyle}>
        <span css={restapiItemLabelStyle}>
          {t("editor.action.resource.restapi.label.action_type")}
        </span>
        <Select
          colorScheme="techPurple"
          css={restApiItemSelectStyle}
          value={currentContent.method}
          width="160px"
          options={["GET", "POST", "PUT", "PATCH", "DELETE"]}
          onChange={(value) => {
            dispatch(
              configActions.updateSelectedAction({
                ...currentAction,
                content: {
                  ...currentContent,
                  method: value,
                },
              }),
            )
          }}
        />
        <Input
          borderColor="techPurple"
          borderRadius="8px 0 0 8px"
          value={currentResource.content.baseUrl}
          css={restApiItemBaseUrlStyle}
          readOnly
        />
        <CodeEditor
          borderRadius="0 8px 8px 0"
          css={restapiItemInputStyle}
          expectedType={VALIDATION_TYPES.STRING}
          value={currentContent.url}
          mode="TEXT_JS"
          onChange={(value) => {
            dispatch(
              configActions.updateSelectedAction({
                ...currentAction,
                content: {
                  ...currentContent,
                  url: value,
                },
              }),
            )
          }}
        />
      </div>
      {/*<RecordEditor*/}
      {/*  label={t("editor.action.resource.restapi.label.url_parameters")}*/}
      {/*  records={currentAction.content.urlParams}*/}
      {/*  onDelete={(index) => {*/}
      {/*    dispatch(*/}
      {/*      configActions.updateSelectedAction({*/}
      {/*        ...currentAction,*/}
      {/*        content: {*/}
      {/*          ...currentContent,*/}
      {/*          urlParams: [*/}
      {/*            ...currentContent.urlParams.slice(0, index),*/}
      {/*            ...currentContent.urlParams.slice(*/}
      {/*              index,*/}
      {/*              currentContent.urlParams.length,*/}
      {/*            ),*/}
      {/*          ],*/}
      {/*        },*/}
      {/*      }),*/}
      {/*    )*/}
      {/*  }}*/}
      {/*  onAdd={() => {*/}
      {/*    dispatch(*/}
      {/*      configActions.updateSelectedAction({*/}
      {/*        ...currentAction,*/}
      {/*        content: {*/}
      {/*          ...currentContent,*/}
      {/*          urlParams: [*/}
      {/*            ...currentContent.urlParams,*/}
      {/*            { key: "", value: "" } as Params,*/}
      {/*          ],*/}
      {/*        },*/}
      {/*      }),*/}
      {/*    )*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<RecordEditor*/}
      {/*  label={t("editor.action.resource.restapi.label.headers")}*/}
      {/*  records={currentAction.content.headers}*/}
      {/*  onDelete={(index) => {*/}
      {/*    dispatch(*/}
      {/*      configActions.updateSelectedAction({*/}
      {/*        ...currentAction,*/}
      {/*        content: {*/}
      {/*          ...currentContent,*/}
      {/*          headers: currentAction.content.headers.splice(index, 1),*/}
      {/*        },*/}
      {/*      }),*/}
      {/*    )*/}
      {/*  }}*/}
      {/*  onAdd={() => {*/}
      {/*    dispatch(*/}
      {/*      configActions.updateSelectedAction({*/}
      {/*        ...currentAction,*/}
      {/*        content: {*/}
      {/*          ...currentContent,*/}
      {/*          headers: [*/}
      {/*            ...currentAction.content.headers,*/}
      {/*            { key: "", value: "" } as Params,*/}
      {/*          ],*/}
      {/*        },*/}
      {/*      }),*/}
      {/*    )*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<RecordEditor*/}
      {/*  label={t("editor.action.resource.restapi.label.cookies")}*/}
      {/*  records={currentAction.content.cookies}*/}
      {/*  onDelete={(index) => {*/}
      {/*    dispatch(*/}
      {/*      configActions.updateSelectedAction({*/}
      {/*        ...currentAction,*/}
      {/*        content: {*/}
      {/*          ...currentContent,*/}
      {/*          cookies: currentAction.content.cookies.splice(index, 1),*/}
      {/*        },*/}
      {/*      }),*/}
      {/*    )*/}
      {/*  }}*/}
      {/*  onAdd={() => {*/}
      {/*    dispatch(*/}
      {/*      configActions.updateSelectedAction({*/}
      {/*        ...currentAction,*/}
      {/*        content: {*/}
      {/*          ...currentContent,*/}
      {/*          cookies: [*/}
      {/*            ...currentAction.content.cookies,*/}
      {/*            { key: "", value: "" } as Params,*/}
      {/*          ],*/}
      {/*        },*/}
      {/*      }),*/}
      {/*    )*/}
      {/*  }}*/}
      {/*/>*/}
      <TransformerComponent />
    </div>
  )
}

RestApiPanel.displayName = "RestApiPanel"
