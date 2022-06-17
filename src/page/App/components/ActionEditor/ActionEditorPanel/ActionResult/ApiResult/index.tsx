import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Tabs, TabPane } from "@illa-design/tabs"
import { JSONViewer } from "@/page/App/components/ActionEditor/ActionEditorPanel/ActionResult/JSONViewer"
import { ApiResultProps } from "./interface"

export const ApiResult: FC<ApiResultProps> = (props) => {
  const { result } = props
  const data = result?.response?.data

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
        <JSONViewer src={result} />
      </TabPane>
    </Tabs>
  )
}

ApiResult.displayName = "ApiResult"
