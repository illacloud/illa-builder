import store from "@/store"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { Api } from "@/api/base"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import { ACTION_TYPE } from "@/page/App/components/ActionEditor/constant"

export function executeAction(action: Partial<ActionItem>, versionId: string) {
  const { actionId, resourceId, actionType, actionTemplate, displayName } =
    action

  if (actionType === "transformer") {
    // TODO: eval transfomer
    // save to redux
    store.dispatch(
      actionActions.updateActionItemReducer({
        ...action,
        // TODO: apply Transfomer
        data: {},
        rawData: {},
        error: false,
      }),
    )
    return
  }

  Api.request(
    {
      url: `/versions/${versionId}/${actionId}/run`,
      method: "POST",
      data: {
        resourceId,
        actionType,
        actionTemplate,
        displayName,
      },
      // TODO: @spike temporay set `User-Agent` in headers,
      // will be removed after handle by server later
      transformRequest: [
        function (data) {
          if (actionType === ACTION_TYPE.REST_API) {
            data.actionTemplate.headers = [
              ...data.actionTemplate.headers,
              ["User-Agent", navigator.userAgent],
            ]
          }

          return JSON.stringify(data)
        },
      ],
    },
    (response) => {
      // TODO: eval transfomer
      // save rawData & transformData to redux
      store.dispatch(
        actionActions.updateActionItemReducer({
          ...action,
          // TODO: apply Transfomer
          data: response.data,
          rawData: response.data,
          error: false,
        }),
      )

      // TODO: trigger success eventhandler
    },
    (response) => {
      // save rawData to redux
      store.dispatch(
        actionActions.updateActionItemReducer({
          ...action,
          // TODO: apply Transfomer
          data: response.data,
          rawData: response.data,
          error: false,
        }),
      )

      // TODO: trigger error eventhandler
    },
  )
}
