import {
  CouchDBActionStructParamsDataTransferType,
  DynamoActionStructParamsDataTransferType,
  GoogleSheetDataTypeTransform,
  HuggingFaceBooleanTypes,
  HuggingFaceBooleanValueMap,
} from "@illa-public/public-configs"
import {
  ActionType,
  AirtableAction,
  AirtableActionConfigType,
  AirtableCreateRecord,
  AirtableDeleteMultipleRecords,
  AirtableDeleteRecord,
  AirtableListRecord,
  AirtableUpdateMultipleRecords,
  AirtableUpdateRecord,
  FirebaseAuthActionTypeValue,
  FirebaseServiceTypeValue,
  FirebaseStoreActionTypeValue,
  ILLADriveAction,
  ILLADriveActionTypeContent,
} from "@illa-public/public-types"
import { Params } from "@illa-public/public-types"
import { isNumber, isString } from "@illa-design/react"
import { isObject } from "@/utils/typeHelper"
import { transformDriveData } from "./driveActions"

const getAppwriteFilterValue = (value: string) => {
  const val = value.trim().replace(/^\[|\]$/g, "")
  return `[${val.split(",").map((v) => `"${v.trim()}"`)}]`
}

export const transformDataFormat = (
  actionType: ActionType,
  contents: Record<string, any>,
) => {
  switch (actionType) {
    case "smtp": {
      const { attachment } = contents
      if (Array.isArray(attachment)) {
        return {
          ...contents,
          attachment: attachment.map((value) => ({
            ...value,
            data: btoa(encodeURIComponent(value.data || "")),
          })),
        }
      } else if (attachment) {
        return {
          ...contents,
          attachment: [btoa(encodeURIComponent(attachment || ""))],
        }
      }
      return contents
    }
    case "restapi": {
      if (contents.bodyType === "raw" && contents.body?.content) {
        return {
          ...contents,
          body: {
            ...contents.body,
            content: JSON.stringify(contents.body.content),
          },
        }
      }
      return contents
    }
    case "firebase":
      const { service, operation } = contents
      if (
        service === FirebaseServiceTypeValue.AUTH &&
        operation === FirebaseAuthActionTypeValue.LIST_USERS
      ) {
        const { number = "", ...others } = contents.options
        return {
          ...contents,
          options: {
            ...others,
            ...(number !== "" && { number }),
          },
        }
      }
      if (
        service === FirebaseServiceTypeValue.FIRESTORE &&
        (operation === FirebaseStoreActionTypeValue.QUERY_FIREBASE ||
          operation === FirebaseStoreActionTypeValue.QUERY_COLLECTION_GROUP)
      ) {
        const { limit = "", ...others } = contents.options
        return {
          ...contents,
          options: {
            ...others,
            ...(limit !== "" && { limit }),
          },
        }
      }
      return contents
    case "graphql": {
      return {
        ...contents,
        query: (contents?.query ?? "").replace(/\n/g, ""),
      }
    }
    case "huggingface":
    case "hfendpoint":
      const isEndpoint = actionType === "hfendpoint"
      const { modelID, detailParams, ...otherParams } = contents
      const { type, content } = otherParams.inputs || {}
      let newInputs = { type, content }
      if (type === "json") {
        if (isString(content)) {
          try {
            newInputs = {
              type,
              content: JSON.parse(content),
            }
          } catch (e) {
            console.log(e)
          }
        }
      }
      const keys = Object.keys(detailParams)
      const realDetailParams = keys.map((key: string) => {
        const currentValue = detailParams[key]
        return {
          key,
          value: currentValue
            ? HuggingFaceBooleanTypes.includes(key)
              ? HuggingFaceBooleanValueMap[
                  currentValue as keyof typeof HuggingFaceBooleanValueMap
                ] ?? currentValue
              : parseFloat(currentValue)
            : "",
        }
      })
      return {
        ...(!isEndpoint && { modelID }),
        params: {
          withDetailParams: otherParams.withDetailParams,
          inputs: newInputs,
          detailParams: realDetailParams,
        },
      }
    case "dynamodb":
      const { structParams } = contents
      let newStructParams = { ...structParams }
      Object.keys(DynamoActionStructParamsDataTransferType).forEach((key) => {
        const value = DynamoActionStructParamsDataTransferType[key]
        if (structParams[key] === "") {
          newStructParams[key] = value
        }
      })
      return {
        ...contents,
        structParams: newStructParams,
      }
    case "couchdb":
      const { opts } = contents
      let newOpts = { ...opts }
      Object.keys(CouchDBActionStructParamsDataTransferType).forEach((key) => {
        const value = CouchDBActionStructParamsDataTransferType[key]
        if (newOpts[key] === "") {
          newOpts[key] = value
        }
      })
      return {
        ...contents,
        opts: newOpts,
      }
    case "appwrite":
      const { method: appwriteMethod, opts: appwriteOpts } = contents
      if (appwriteMethod === "list") {
        const { orderBy = [], filter = [], limit = 100 } = appwriteOpts
        return {
          ...contents,
          opts: {
            ...appwriteOpts,
            orderBy: orderBy.map(({ key, ...others }: Params) => ({
              ...others,
              attribute: key,
            })),
            filter: filter.map(({ key, value, ...others }: Params) => ({
              ...others,
              value: getAppwriteFilterValue(value),
              attribute: key,
            })),
            limit: isNumber(limit) ? limit : 100,
          },
        }
      }
      const { data, ...other } = appwriteOpts
      const showData = !["get", "delete"].includes(appwriteMethod)
      return {
        ...contents,
        opts: {
          ...other,
          ...(showData && { data: isObject(data) ? data : {} }),
        },
      }
    case "googlesheets": {
      const { opts: googleOpts } = contents
      const googleSheetsTransformKeys = Object.keys(
        GoogleSheetDataTypeTransform,
      )
      const newGoogleSheetOpts = { ...googleOpts }
      googleSheetsTransformKeys.forEach((key) => {
        const value =
          GoogleSheetDataTypeTransform[
            key as keyof typeof GoogleSheetDataTypeTransform
          ]
        if (newGoogleSheetOpts[key] === "") {
          newGoogleSheetOpts[key] = value
        }
      })
      return {
        ...contents,
        opts: newGoogleSheetOpts,
      }
    }
    case "airtable": {
      const { method } = contents as AirtableAction<AirtableActionConfigType>
      switch (method) {
        case "list":
          const listConfig = contents.config as AirtableListRecord
          return {
            ...contents,
            config: {
              ...listConfig,
              fields: listConfig.fields === "" ? [] : listConfig.fields,
              maxRecords:
                listConfig.maxRecords === "" ? -1 : listConfig.maxRecords,
              pageSize: listConfig.pageSize === "" ? -1 : listConfig.pageSize,
              sort: listConfig.sort === "" ? [] : listConfig.sort,
            },
          }
        case "delete":
          const deleteConfig = contents.config as AirtableDeleteRecord
          return {
            ...contents,
            config: {
              ...deleteConfig,
              recordID:
                deleteConfig.recordID === "" ? "" : deleteConfig.recordID,
            },
          }
        case "create":
          const createConfig = contents.config as AirtableCreateRecord
          return {
            ...contents,
            config: {
              ...createConfig,
              records: createConfig.records === "" ? [] : createConfig.records,
            },
          }
        case "update":
          const updateConfig = contents.config as AirtableUpdateRecord
          return {
            ...contents,
            config: {
              ...updateConfig,
              record: updateConfig.record === "" ? {} : updateConfig.record,
            },
          }
        case "bulkUpdate":
          const bulkUpdateConfig =
            contents.config as AirtableUpdateMultipleRecords
          return {
            ...contents,
            config: {
              ...bulkUpdateConfig,
              records:
                bulkUpdateConfig.records === "" ? [] : bulkUpdateConfig.records,
            },
          }
        case "bulkDelete":
          const bulkDeleteConfig =
            contents.config as AirtableDeleteMultipleRecords
          return {
            ...contents,
            config: {
              ...bulkDeleteConfig,
              recordIDs:
                bulkDeleteConfig.recordIDs === ""
                  ? []
                  : bulkDeleteConfig.recordIDs,
            },
          }
      }
    }
    case "aiagent": {
      return {
        agentType: contents.virtualResource?.agentType ?? contents.agentType,
        model: contents.virtualResource?.model ?? contents.model,
        input: contents.input,
        modelConfig: {
          maxTokens: (
            contents.virtualResource?.modelConfig ?? contents.modelConfig
          ).maxTokens,
          stream: false,
        },
        variables: contents.variables,
        virtualResource: contents.virtualResource,
      }
    }
    case "illadrive": {
      return transformDriveData(
        contents as ILLADriveAction<ILLADriveActionTypeContent>,
      )
    }
    default:
      return contents
  }
}
