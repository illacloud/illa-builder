import { FieldValues, UseFormHandleSubmit } from "react-hook-form"
import { createMessage, omit } from "@illa-design/react"
import { BuilderApi } from "@/api/base"
import i18n from "@/i18n/config"
import { configActions } from "@/redux/config/configSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { getAppId } from "@/redux/currentApp/appInfo/appInfoSelector"
import { GraphQLAuth, GraphQLAuthValue } from "@/redux/resource/graphqlResource"
import { resourceActions } from "@/redux/resource/resourceSlice"
import {
  Resource,
  ResourceContent,
  ResourceType,
  generateSSLConfig,
} from "@/redux/resource/resourceState"
import store from "@/store"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"

function getBaseActionUrl() {
  const rootState = store.getState()
  const appId = getAppId(rootState)
  return `/apps/${appId}/actions`
}

const message = createMessage()

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
  BuilderApi.teamRequest(
    {
      url: baseActionUrl,
      method: "POST",
      data,
    },
    ({ data }: { data: ActionItem<ActionContent> }) => {
      message.success({
        content: i18n.t("editor.action.action_list.message.success_created"),
      })
      store.dispatch(actionActions.addActionItemReducer(data))
      store.dispatch(configActions.changeSelectedAction(data))
    },
    () => {
      message.error({
        content: i18n.t("editor.action.action_list.message.failed"),
      })
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

  BuilderApi.teamRequest(
    {
      url: `${baseActionUrl}/${actionId}`,
      method: "DELETE",
    },
    ({ data }: { data: ActionItem<ActionContent> }) => {
      DisplayNameGenerator.removeDisplayName(displayName)
      store.dispatch(actionActions.removeActionItemReducer(displayName))
      message.success({
        content: i18n.t("editor.action.action_list.message.success_deleted"),
      })
    },
    () => {
      message.error({
        content: i18n.t("editor.action.action_list.message.failed"),
      })
    },
    () => {},
    (loading) => {},
  )
}

export function generateGraphQLAuthContent(data: {
  [p: string]: any
}): GraphQLAuth | null {
  let authContent: GraphQLAuth | null = null
  switch (data.authentication) {
    case GraphQLAuthValue.BASIC:
      authContent = {
        username: data.username,
        password: data.password,
      }
      break
    case GraphQLAuthValue.BEARER:
      authContent = {
        bearerToken: data.bearerToken,
      }
      break
    case GraphQLAuthValue.APIKEY:
      authContent = {
        key: data.key,
        value: data.value,
        addTo: data.addTo,
        headerPrefix: data.headerPrefix,
      }
      break
    default:
      break
  }
  return authContent
}

function getActionContentByType(data: FieldValues, type: ResourceType) {
  switch (type) {
    case "firebase":
      return {
        databaseUrl: data.databaseUrl,
        projectID: data.projectID,
        privateKey: JSON.parse(data.privateKey),
      }
    case "elasticsearch":
      return {
        host: data.host,
        port: data.port.toString(),
        username: data.username,
        password: data.password,
      }
    case "s3":
      return {
        bucketName: data.bucketName,
        region: data.region,
        endpoint: data.endpoint,
        baseURL: data.baseURL,
        accessKeyID: data.accessKeyID,
        secretAccessKey: data.secretAccessKey,
        acl:
          !data.acl || data.acl === i18n.t("editor.action.acl.option.blank")
            ? ""
            : data.acl,
      }
    case "smtp":
      return {
        host: data.host,
        port: +data.port,
        username: data.username,
        password: data.password,
      }
    case "clickhouse":
      return {
        host: data.host,
        port: +data.port,
        username: data.username,
        password: data.password,
        databaseName: data.databaseName,
        ssl: generateSSLConfig(!!data.ssl, data, "clickhouse"),
      }
    case "graphql":
      return {
        baseUrl: data.baseUrl,
        urlParams: data.urlParams,
        headers: data.headers,
        cookies: data.cookies,
        authentication: data.authentication,
        disableIntrospection: data.disableIntrospection,
        authContent: generateGraphQLAuthContent(data),
      }
    case "mssql":
      return {
        host: data.host,
        port: data.port.toString(),
        databaseName: data.databaseName,
        username: data.username,
        password: data.password,
        connectionOpts: data.connectionOpts,
        ssl: generateSSLConfig(!!data.ssl, data, "mssql"),
      }
    case "huggingface":
      return {
        token: data.token,
      }
    case "hfendpoint":
      return {
        token: data.token,
        endpoint: data.endpoint,
      }
    case "snowflake":
      return {
        accountName: data.accountName,
        warehouse: data.warehouse,
        database: data.database,
        schema: data.schema,
        role: data.role,
        authentication: data.authentication,
        authContent:
          data.authentication === "basic"
            ? {
                username: data.username,
                password: data.password,
              }
            : {
                username: data.username,
                privateKey: data.privateKey,
              },
      }
    case "dynamodb":
      const { region, accessKeyID, secretAccessKey } = data
      return {
        region,
        accessKeyID,
        secretAccessKey,
      }
  }
}

export function onActionConfigElementSubmit(
  handleSubmit: UseFormHandleSubmit<FieldValues>,
  resourceId: string | undefined,
  resourceType: ResourceType,
  finishedHandler: (resourceId: string) => void,
  loadingHandler: (value: boolean) => void,
) {
  const method = resourceId != undefined ? "PUT" : "POST"
  const url =
    resourceId != undefined ? `/resources/${resourceId}` : `/resources`

  return handleSubmit((data: FieldValues) => {
    let content
    try {
      content = getActionContentByType(data, resourceType)
    } catch (e) {
      message.error({
        content: i18n.t("editor.action.resource.db.invalid_private.key"),
      })
      return
    }
    BuilderApi.teamRequest<Resource<ResourceContent>>(
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
        message.success({
          content: i18n.t("dashboard.resource.save_success"),
        })
        finishedHandler(response.data.resourceId)
      },
      (error) => {
        message.error({
          content:
            error.data.errorMessage || i18n.t("dashboard.resource.save_fail"),
        })
      },
      () => {
        message.error({
          content: i18n.t("dashboard.resource.save_fail"),
        })
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
  return BuilderApi.teamRequest<Resource<ResourceContent>>(
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
      message.success({
        content: i18n.t("dashboard.resource.test_success"),
      })
    },
    (error) => {
      message.error({
        content: error.data.errorMessage,
      })
    },
    () => {
      message.error({
        content: i18n.t("dashboard.resource.test_fail"),
      })
    },
    (loading) => {
      loadingHandler(loading)
    },
  )
}
