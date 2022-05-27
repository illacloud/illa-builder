import { FC, useState, useContext } from "react"
import { useTranslation } from "react-i18next"
import { Select } from "@illa-design/select"
import { Input } from "@illa-design/input"
import { RESTAPIFormValues } from "@/page/Editor/components/ActionEditor/ConfigureResourceForm/Resources/RESTAPI/interface"
import { FieldArray } from "@/page/Editor/components/ActionEditor/ActionEditorPanel/FieldArray"
import { ActionEditorContext } from "@/page/Editor/components/ActionEditor/context"
import { useSelector } from "react-redux"
import { selectAllActionItem } from "@/redux/action/actionList/actionListSelector"
import { selectAllResource } from "@/redux/action/resource/resourceSelector"
import { Body } from "./Body"
import {
  configContainerCss,
  descriptionCss,
  gridRowContainerCss,
  labelTextCss,
  applyGridColIndex,
} from "../style"
import { actionTypeCss } from "./style"
import {
  RESTAPIPanelProps,
  Params,
  BodyParams,
  RESTAPIPanelConfig,
} from "./interface"

export const RESTAPIPanel: FC<RESTAPIPanelProps> = (props) => {
  const { onChange } = props
  const { t } = useTranslation()
  const { activeActionItemId } = useContext(ActionEditorContext)
  const action =
    useSelector(selectAllActionItem).find(
      ({ id }) => id === activeActionItemId,
    ) ?? null
  const resourceId = action?.resourceId
  const resource =
    useSelector(selectAllResource).find(({ id }) => id === resourceId) ?? null

  const config = action?.config?.general as RESTAPIPanelConfig
  const resourceConfig = resource?.config as RESTAPIFormValues
  const baseURL = resourceConfig?.BaseURL

  const [method, setMethod] = useState(config?.method ?? "GET")
  const [path, setPath] = useState(config?.path)
  const [urlParameters, setUrlParameters] = useState<Params[]>(
    config?.URLParameters ?? [],
  )
  const [headers, setHeaders] = useState<Params[]>(config?.Headers ?? [])
  const [body, setBody] = useState<BodyParams[]>(config?.Body ?? [])
  const [cookies, setCookies] = useState<Params[]>(config?.Cookies ?? [])

  const hasBody = method.indexOf("GET") === -1

  return (
    <div css={configContainerCss}>
      <div css={gridRowContainerCss}>
        <label css={labelTextCss}>
          {t("editor.action.resource.restApi.label.actionType")}
        </label>
        <div css={actionTypeCss}>
          <Select
            value={method}
            onChange={setMethod}
            options={["GET", "POST", "PUT", "DELETE", "PATCH"]}
            size={"small"}
          />
          <Input
            value={path}
            onChange={setPath}
            placeholder={t(
              "editor.action.resource.restApi.placeholder.actionUrlPath",
            )}
            addonBefore={{ render: baseURL ?? null }}
          />
        </div>
        <dd css={[applyGridColIndex(2), descriptionCss]}>
          {t("editor.action.resource.restApi.tip.getReqAutoRun")}
        </dd>
      </div>

      <div css={gridRowContainerCss}>
        <label css={labelTextCss}>
          {t("editor.action.resource.restApi.label.urlParameters")}
        </label>
        <FieldArray value={urlParameters} onChange={setUrlParameters} />
      </div>

      <div css={gridRowContainerCss}>
        <label css={labelTextCss}>
          {t("editor.action.resource.restApi.label.headers")}
        </label>
        <FieldArray value={headers} onChange={setHeaders} />
      </div>

      {hasBody && (
        <div css={gridRowContainerCss}>
          <label css={labelTextCss}>
            {t("editor.action.resource.restApi.label.body")}
          </label>
          <Body value={body} onChange={setBody} />
        </div>
      )}

      <div css={gridRowContainerCss}>
        <label css={labelTextCss}>
          {t("editor.action.resource.restApi.label.cookies")}
        </label>
        <FieldArray value={cookies} onChange={setCookies} />
      </div>
    </div>
  )
}
