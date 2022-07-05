import { FC } from "react"
import { RESTAPIConfigureValues } from "@/page/App/components/ActionEditor/Resource"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { getSelectedAction } from "@/redux/config/configSelector"
import { selectAllResource } from "@/redux/resource/resourceSelector"
import { Tabs, TabPane } from "@illa-design/tabs"
import { JSONViewer } from "@/page/App/components/ActionEditor/ActionEditorPanel/ActionResult/JSONViewer"
import { ApiResultProps } from "./interface"

function concatUrl(path: string = "", urlParams = [], baseUrl?: string) {
  const params =
    urlParams && urlParams.map(({ key, value }) => `${key}=${value}`).join("&")
  const url = params ? `${path}?${params}` : path
  return baseUrl ? `${baseUrl}/${url}` : url
}

export const ApiResult: FC<ApiResultProps> = (props) => {
  const activeActionItem = useSelector(getSelectedAction)
  const resource = useSelector(selectAllResource).find(
    ({ resourceId }) => resourceId === activeActionItem.resourceId,
  )
  const baseURL = (resource?.options as RESTAPIConfigureValues)?.baseURL
  const url = activeActionItem.actionTemplate?.url
  const urlParams = activeActionItem.actionTemplate?.urlParams
  const method = activeActionItem.actionTemplate?.method
  const body = activeActionItem.actionTemplate?.body
  const headers = activeActionItem.actionTemplate?.headers
  const { result } = props
  const data = result?.data
  const apiRequest = {
    request: {
      url: concatUrl(url, urlParams, baseURL),
      method,
      body: body?.length ? body : null,
      headers: headers?.length ? headers : null,
    },
    response: result,
  }

  const { t } = useTranslation()

  return (
    <Tabs variant="text">
      <TabPane key="response" title={t("editor.action.result.title.response")}>
        <JSONViewer src={data} />
      </TabPane>
      <TabPane
        key="api-request"
        title={t("editor.action.result.title.api_request")}
      >
        <JSONViewer src={apiRequest} />
      </TabPane>
    </Tabs>
  )
}

ApiResult.displayName = "ApiResult"
