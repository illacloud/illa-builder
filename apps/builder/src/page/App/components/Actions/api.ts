import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { omit } from "@illa-design/system"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { Api } from "@/api/base"
import { Message } from "@illa-design/message"
import i18n from "@/i18n/config"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { configActions } from "@/redux/config/configSlice"
import store from "@/store"
import { getAppId } from "@/redux/currentApp/appInfo/appInfoSelector"
import { resourceActions } from "@/redux/resource/resourceSlice"
import {
  generateSSLConfig,
  Resource,
  ResourceContent,
  ResourceType,
} from "@/redux/resource/resourceState"
import { FieldValues, UseFormHandleSubmit } from "react-hook-form"
import { MongoConfigType, MongoDbSSL } from "@/redux/resource/mongodbResource"
import { generateAuthContent } from "@/page/App/components/Actions/RestApiConfigElement"

function getBaseActionUrl() {
  const rootState = store.getState()
  const appId = getAppId(rootState)
  return `/apps/${appId}/actions`
}

export function onCopyActionItem(action: ActionItem<ActionContent>) {
  const baseActionUrl = getBaseActionUrl()
  const newAction = omit(action, ["displayName", "actionId"])
  const displayName = DisplayNameGenerator.generateDisplayName(
    action.actionType,
  )
  const data: Partial<ActionItem<ActionContent>> = {
    ...newAction,
    displayName,
  }
  Api.request(
    {
      url: baseActionUrl,
      method: "POST",
      data,
    },
    ({ data }: { data: ActionItem<ActionContent> }) => {
      Message.success(
        i18n.t("editor.action.action_list.message.success_created"),
      )
      store.dispatch(actionActions.addActionItemReducer(data))
      store.dispatch(configActions.changeSelectedAction(data))
    },
    () => {
      Message.error(i18n.t("editor.action.action_list.message.failed"))
      DisplayNameGenerator.removeDisplayName(displayName)
    },
    () => {
      DisplayNameGenerator.removeDisplayName(displayName)
    },
    (loading) => {},
  )
}

export function onDeleteActionItem(action: ActionItem<ActionContent>) {
  const baseActionUrl = getBaseActionUrl()
  const { actionId, displayName } = action

  Api.request(
    {
      url: `${baseActionUrl}/${actionId}`,
      method: "DELETE",
    },
    ({ data }: { data: ActionItem<ActionContent> }) => {
      DisplayNameGenerator.removeDisplayName(displayName)
      store.dispatch(actionActions.removeActionItemReducer(displayName))
      Message.success(
        i18n.t("editor.action.action_list.message.success_deleted"),
      )
    },
    () => {
      Message.error(
        i18n.t("editor.action.action_list.message.failed_to_delete"),
      )
    },
    () => {},
    (loading) => {},
  )
}

function getActionContentByType(
  data: FieldValues,
  type: ResourceType,
  sslOpen: boolean = false,
  mongoType: MongoConfigType = "gui",
) {
  const basicContent = {
    host: data.host,
    port: data.port.toString(),
    databaseUsername: data.databaseUsername,
    databasePassword: data.databasePassword,
  }

  switch (type) {
    case "elasticsearch":
      return basicContent
    case "mysql":
    case "tidb":
    case "postgresql":
    case "mariadb":
      return {
        ...basicContent,
        databaseName: data.databaseName,
        ssl: generateSSLConfig(sslOpen, data),
      }
    case "redis":
      return {
        ...basicContent,
        databaseIndex: data.databaseIndex ?? 0,
        ssl: sslOpen,
      }
    case "mongodb":
      return mongoType === "gui"
        ? {
            configType: data.configType,
            ssl: {
              open: sslOpen,
              client: data.client,
              ca: data.ca,
            } as MongoDbSSL,
            configContent: {
              host: data.host,
              port:
                data.connectionFormat === "standard"
                  ? data.port.toString()
                  : "",
              connectionFormat: data.connectionFormat,
              databaseName: data.databaseName,
              databaseUsername: data.databaseUsername,
              databasePassword: data.databasePassword,
            },
          }
        : {
            configType: data.configType,
            ssl: {
              open: sslOpen,
              client: data.client,
              ca: data.ca,
            } as MongoDbSSL,
            configContent: {
              uri: data.uri,
            },
          }

    case "restapi":
      return {
        baseUrl: data.baseUrl,
        urlParams: data.urlParams,
        headers: data.headers,
        cookies: data.cookies,
        authentication: data.authentication,
        authContent: generateAuthContent(data),
      }
  }
}

export function onActionConfigElementSubmit(
  handleSubmit: UseFormHandleSubmit<FieldValues>,
  resourceId: string | undefined,
  resourceType: ResourceType,
  finishedHandler: (resourceId: string) => void,
  loadingHandler: (value: boolean) => void,
  sslOpen?: boolean,
  mongoType?: MongoConfigType,
) {
  const method = resourceId != undefined ? "PUT" : "POST"
  const url =
    resourceId != undefined ? `/resources/${resourceId}` : `/resources`

  return handleSubmit((data: FieldValues) => {
    const content = getActionContentByType(
      data,
      resourceType,
      sslOpen,
      mongoType,
    )

    Api.request<Resource<ResourceContent>>(
      {
        method,
        url,
        data: {
          ...(resourceId !== undefined && { resourceId: data.resourceId }),
          resourceName: data.resourceName,
          resourceType: resourceType,
          content,
        },
      },
      (response) => {
        if (resourceId !== undefined) {
          store.dispatch(
            resourceActions.updateResourceItemReducer(response.data),
          )
        } else {
          store.dispatch(resourceActions.addResourceItemReducer(response.data))
        }
        Message.success(i18n.t("dashboard.resource.save_success"))
        finishedHandler(response.data.resourceId)
      },
      (error) => {
        Message.error(
          error.data.errorMessage || i18n.t("dashboard.resource.save_fail"),
        )
      },
      () => {
        Message.error(i18n.t("dashboard.resource.save_fail"))
      },
      (loading) => {
        loadingHandler(loading)
      },
    )
  })
}

export function onActionConfigElementTest(
  data: FieldValues,
  content: ResourceContent,
  resourceType: ResourceType,
  loadingHandler: (value: boolean) => void,
) {
  return Api.request<Resource<ResourceContent>>(
    {
      method: "POST",
      url: `/resources/testConnection`,
      data: {
        resourceId: data.resourceId,
        resourceName: data.resourceName,
        resourceType,
        content,
      },
    },
    (response) => {
      Message.success(i18n.t("dashboard.resource.test_success"))
    },
    (error) => {
      Message.error(error.data.errorMessage)
    },
    () => {
      Message.error(i18n.t("dashboard.resource.test_fail"))
    },
    (loading) => {
      loadingHandler(loading)
    },
  )
}
