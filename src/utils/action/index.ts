import { AxiosResponse, AxiosError } from "axios"
import { Api } from "@/api/base"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import { ACTION_TYPE } from "@/page/App/components/ActionEditor/constant"

export function executeAction(
  action: Partial<ActionItem>,
  versionId: string,
  successCallback?: (response: AxiosResponse) => void,
  failureCallback?: (response: AxiosResponse) => void,
  crashCallback?: (error: AxiosError) => void,
  loadingCallback?: (loading: boolean) => void,
) {
  const { actionId, resourceId, actionType, actionTemplate, displayName } =
    action

  if (actionType === "transformer") {
    // TODO: run transformer
    successCallback?.()
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
      successCallback?.(response)
    },
    (response) => {
      failureCallback?.(response)
    },
    (error) => {
      crashCallback?.(error)
    },
    (loading) => {
      loadingCallback?.(loading)
    },
  )
}
