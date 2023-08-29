import { FieldValues, UseFormHandleSubmit } from "react-hook-form"
import { v4 } from "uuid"
import { createMessage, omit } from "@illa-design/react"
import i18n from "@/i18n/config"
import { getIsILLAGuideMode } from "@/redux/config/configSelector"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { GraphQLAuth, GraphQLAuthValue } from "@/redux/resource/graphqlResource"
import { neonSSLInitialValue } from "@/redux/resource/neonResource"
import { resourceActions } from "@/redux/resource/resourceSlice"
import {
  ResourceContent,
  ResourceType,
  generateSSLConfig,
} from "@/redux/resource/resourceState"
import { RestApiAuth } from "@/redux/resource/restapiResource"
import { DATABASE_INDEX, DEFAULT_NAME } from "@/redux/resource/upstashResource"
import {
  fetchActionTestConnection,
  fetchCreateAction,
  fetchDeleteAction,
} from "@/services/action"
import {
  requestCreateResource,
  requestUpdateResource,
} from "@/services/resource"
import store from "@/store"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { ILLABuilderStorage } from "@/utils/storage"
import { isILLAAPiError } from "@/utils/typeHelper"

const message = createMessage()

export async function onCopyActionItem(action: ActionItem<ActionContent>) {
  const isGuideMode = getIsILLAGuideMode(store.getState())
  const newAction = omit(action, ["displayName", "actionID"])
  const displayName = DisplayNameGenerator.generateDisplayName(
    action.actionType,
  )
  const data: Omit<ActionItem<ActionContent>, "actionID"> = {
    ...newAction,
    displayName,
  }
  if (isGuideMode) {
    const createActionData: ActionItem<ActionContent> = {
      ...data,
      actionID: v4(),
    }
    store.dispatch(actionActions.addActionItemReducer(createActionData))
    message.success({
      content: i18n.t("editor.action.action_list.message.success_created"),
    })
    return
  }
  try {
    const response = await fetchCreateAction(data)
    message.success({
      content: i18n.t("editor.action.action_list.message.success_created"),
    })
    store.dispatch(actionActions.addActionItemReducer(response.data))
  } catch (e) {
    if (isILLAAPiError(e)) {
      message.error({
        content: i18n.t("editor.action.action_list.message.failed"),
      })
      DisplayNameGenerator.removeDisplayName(displayName)
    } else {
      DisplayNameGenerator.removeDisplayName(displayName)
    }
  }
}

export async function onDeleteActionItem(action: ActionItem<ActionContent>) {
  const isGuideMode = getIsILLAGuideMode(store.getState())
  const { actionID, displayName } = action
  if (isGuideMode) {
    store.dispatch(
      actionActions.removeActionItemReducer({
        actionID: actionID,
        displayName,
      }),
    )
    message.success({
      content: i18n.t("editor.action.action_list.message.success_deleted"),
    })
    return
  }
  try {
    await fetchDeleteAction(actionID)
    store.dispatch(
      actionActions.removeActionItemReducer({
        actionID: actionID,
        displayName,
      }),
    )
    message.success({
      content: i18n.t("editor.action.action_list.message.success_deleted"),
    })
  } catch (e) {
    if (isILLAAPiError(e)) {
      message.error({
        content: i18n.t("editor.action.action_list.message.failed"),
      })
    }
  }
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

export const generateRestAPIAuthContent = (data: {
  [p: string]: any
}): RestApiAuth => {
  let authContent: RestApiAuth = {}
  switch (data.authentication) {
    case "basic":
    case "digest":
      authContent = {
        username: data.username,
        password: data.password,
      }
      break
    case "bearer":
      authContent = {
        token: data.token,
      }
      break
    default:
      authContent = {}
      break
  }
  return authContent
}

function getActionContentByType(data: FieldValues, type: ResourceType) {
  switch (type) {
    case "mongodb":
      return {
        configType: data.configType,
        ssl: {
          open: data.open,
          client: data.client,
          ca: data.ca,
        },
        configContent:
          data.configType === "gui"
            ? {
                host: data.host.trim(),
                port:
                  data.connectionFormat === "standard"
                    ? data.port.toString()
                    : "",
                connectionFormat: data.connectionFormat,
                databaseName: data.databaseName,
                databaseUsername: data.databaseUsername,
                databasePassword: data.databasePassword,
              }
            : {
                uri: data.uri.trim(),
              },
      }
    case "supabasedb":
    case "tidb":
    case "mariadb":
    case "mysql":
    case "postgresql":
    case "hydra":
      return {
        host: data.host.trim(),
        port: data.port.toString(),
        databaseName: data.databaseName,
        databaseUsername: data.databaseUsername,
        databasePassword: data.databasePassword,
        ssl: generateSSLConfig(data.ssl, data),
      }
    case "redis":
      return {
        host: data.host.trim(),
        port: data.port.toString(),
        databaseIndex: data.databaseIndex ?? 0,
        databaseUsername: data.databaseUsername,
        databasePassword: data.databasePassword,
        ssl: data.ssl,
      }
    case "upstash":
      return {
        host: data.host.trim(),
        port: data.port.toString(),
        databaseIndex: DATABASE_INDEX,
        databaseUsername: DEFAULT_NAME,
        databasePassword: data.databasePassword,
        ssl: true,
      }
    case "firebase":
      return {
        databaseUrl: data.databaseUrl.trim(),
        projectID: data.projectID,
        privateKey: JSON.parse(data.privateKey),
      }
    case "elasticsearch":
      return {
        host: data.host.trim(),
        port: data.port.toString(),
        username: data.username,
        password: data.password,
      }
    case "s3":
      return {
        bucketName: data.bucketName,
        region: data.region,
        endpoint: data.endpoint,
        baseURL: data.baseURL && data.baseURL.trim(),
        accessKeyID: data.accessKeyID,
        secretAccessKey: data.secretAccessKey,
        acl:
          !data.acl || data.acl === i18n.t("editor.action.acl.option.blank")
            ? ""
            : data.acl,
      }
    case "smtp":
      return {
        host: data.host.trim(),
        port: +data.port,
        username: data.username,
        password: data.password,
      }
    case "clickhouse":
      return {
        host: data.host.trim(),
        port: +data.port,
        username: data.username,
        password: data.password,
        databaseName: data.databaseName,
        ssl: generateSSLConfig(!!data.ssl, data, "clickhouse"),
      }
    case "graphql":
      return {
        baseUrl: data.baseUrl.trim(),
        urlParams: data.urlParams,
        headers: data.headers,
        cookies: data.cookies,
        authentication: data.authentication,
        disableIntrospection: data.disableIntrospection,
        authContent: generateGraphQLAuthContent(data),
      }
    case "mssql":
      return {
        host: data.host.trim(),
        port: data.port.toString(),
        databaseName: data.databaseName,
        username: data.username,
        password: data.password,
        connectionOpts: data.connectionOpts,
        ssl: generateSSLConfig(!!data.ssl, data, "mssql"),
      }
    case "oracle": {
      const { resourceName: _resourceName, host, ...otherParams } = data
      return {
        ...otherParams,
        host: host.trim(),
      }
    }
    case "huggingface":
      return {
        token: data.token,
      }
    case "hfendpoint":
      return {
        token: data.token,
        endpoint: data.endpoint.trim(),
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
    case "couchdb": {
      const {
        resourceName: _couchDBResName,
        host,
        ...otherCouchDBParams
      } = data
      return { ...otherCouchDBParams, host: host.trim() }
    }
    case "appwrite":
      const { host, projectID, databaseID, apiKey } = data
      return {
        host: host.trim(),
        projectID,
        databaseID,
        apiKey,
      }
    case "restapi":
      const {
        resourceName: _restApiResName,
        baseUrl,
        caCert = "",
        clientKey = "",
        clientCert = "",
        mode = "verify-full",
        ...otherRestApiParams
      } = data
      return {
        ...otherRestApiParams,
        baseUrl: baseUrl.trim(),
        authContent: generateRestAPIAuthContent(data),
        certs: {
          caCert,
          clientKey,
          clientCert,
          mode,
        },
      }
    case "googlesheets":
      const status =
        data.authentication === "oauth2" &&
        ILLABuilderStorage.getLocalStorage("oAuthStatus")
      let oAuthOpts = {}
      if (status) {
        ILLABuilderStorage.removeLocalStorage("oAuthStatus")
        oAuthOpts = {
          status,
        }
      }
      return {
        authentication: data.authentication,
        opts: {
          privateKey: data.privateKey,
          accessType: data.accessType,
          ...oAuthOpts,
        },
      }
    case "neon": {
      const {
        resourceName: _neonResourceName,
        connectionString: _connectionString,
        host,
        port,
        ...otherNeonParams
      } = data
      return {
        ...otherNeonParams,
        host: host.trim(),
        port: port.toString(),
        ssl: neonSSLInitialValue,
      }
    }
    case "airtable": {
      return {
        authenticationType: "personalToken",
        authenticationConfig: {
          token: data.token,
        },
      }
    }
  }
}

export function onActionConfigElementSubmit(
  handleSubmit: UseFormHandleSubmit<FieldValues>,
  resourceID: string | undefined,
  resourceType: ResourceType,
  finishedHandler: (resourceID: string) => void,
  loadingHandler: (value: boolean) => void,
) {
  const isUpdate = resourceID != undefined

  return handleSubmit(async (data: FieldValues) => {
    let content
    try {
      content = getActionContentByType(data, resourceType)
    } catch (e) {
      message.error({
        content: i18n.t("editor.action.resource.db.invalid_private.key"),
      })
      return
    }
    const requestData = {
      ...(isUpdate && { resourceID: data.resourceID }),
      resourceName: data.resourceName,
      resourceType: resourceType,
      content,
    }
    loadingHandler(true)

    try {
      if (isUpdate) {
        const response = await requestUpdateResource(resourceID, requestData)
        store.dispatch(resourceActions.updateResourceItemReducer(response.data))
        finishedHandler(response.data.resourceID)
      } else {
        const response = await requestCreateResource(requestData)
        store.dispatch(resourceActions.addResourceItemReducer(response.data))
        finishedHandler(response.data.resourceID)
      }
      message.success({
        content: i18n.t("dashboard.resource.save_success"),
      })
    } catch (e) {
      if (isILLAAPiError(e)) {
        message.error({
          content:
            e.data.errorMessage || i18n.t("dashboard.resource.save_fail"),
        })
      } else {
        message.error({
          content: i18n.t("dashboard.resource.save_fail"),
        })
      }
    }
    loadingHandler(false)
  })
}

export async function onActionConfigElementTest(
  data: FieldValues,
  content: ResourceContent,
  resourceType: ResourceType,
  loadingHandler: (value: boolean) => void,
) {
  loadingHandler(true)
  const requestBody = {
    resourceID: data.resourceID,
    resourceName: data.resourceName,
    resourceType,
    content,
  }
  try {
    await fetchActionTestConnection(requestBody)
    message.success({
      content: i18n.t("dashboard.resource.test_success"),
    })
  } catch (error) {
    if (isILLAAPiError(error)) {
      message.error({
        content: error.data.errorMessage,
      })
    } else {
      message.error({
        content: i18n.t("dashboard.resource.test_fail"),
      })
    }
  }
  loadingHandler(false)
}
