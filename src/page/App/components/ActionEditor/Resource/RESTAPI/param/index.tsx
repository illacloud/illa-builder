import { FC, useState, useContext } from "react"
import { css } from "@emotion/react"
import { useTranslation } from "react-i18next"
import { Select } from "@illa-design/select"
import { Input } from "@illa-design/input"
import { FieldArray } from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor/FieldArray"
import { ActionEditorContext } from "@/page/App/components/ActionEditor/context"
import { useSelector } from "react-redux"
import { selectAllActionItem } from "@/redux/currentApp/action/actionList/actionListSelector"
import { selectAllResource } from "@/redux/currentApp/action/resource/resourceSelector"
import {
  configContainerStyle,
  descriptionStyle,
  paramGridRowContainerStyle,
  labelTextStyle,
  applyGridColIndex,
} from "@/page/App/components/ActionEditor/Resource/style"
import { Body } from "./Body"
import { actionTypeStyle } from "./style"
import {
  RESTAPIParamProps,
  RESTAPIConfigureValues,
  RESTAPIParamValues,
} from "../interface"

export const RESTAPIParam: FC<RESTAPIParamProps> = (props) => {
  const { onChange } = props
  const { t } = useTranslation()
  const { activeActionItemId, resourceId } = useContext(ActionEditorContext)
  const action =
    useSelector(selectAllActionItem).find(
      ({ actionId: id }) => id === activeActionItemId,
    ) ?? null
  const resource =
    useSelector(selectAllResource).find(
      ({ resourceId: id }) => id === resourceId,
    ) ?? null

  const config = action?.config?.general as RESTAPIParamValues
  const resourceConfig = resource?.config as RESTAPIConfigureValues
  const baseURL = resourceConfig?.baseURL

  const [params, setParams] = useState({
    method: config?.method ?? "GET",
    path: config?.path,
    URLParameters: config?.URLParameters ?? [],
    Headers: config?.Headers ?? [],
    Body: config?.Body ?? [],
    Cookies: config?.Cookies ?? [],
  })

  const hasBody = params.method.indexOf("GET") === -1

  function updateField(field: string) {
    return (v: any) => {
      setParams((preParam) => {
        const newParam = { ...preParam, [field]: v }
        onChange && onChange(newParam)
        return newParam
      })
    }
  }

  return (
    <div css={configContainerStyle}>
      <div css={paramGridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.rest_api.label.action_type")}
        </label>
        <div css={actionTypeStyle}>
          <Select
            value={params.method}
            onChange={updateField("method")}
            options={["GET", "POST", "PUT", "DELETE", "PATCH"]}
            size={"small"}
          />
          <Input
            value={params.path}
            onChange={updateField("path")}
            placeholder={t(
              "editor.action.resource.rest_api.placeholder.action_url_path",
            )}
            addonBefore={{ render: baseURL ?? null }}
          />
        </div>
        <dd css={css(applyGridColIndex(2), descriptionStyle)}>
          {t("editor.action.resource.rest_api.tip.get_req_auto_run")}
        </dd>
      </div>

      <div css={paramGridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.rest_api.label.url_parameters")}
        </label>
        <FieldArray
          value={params.URLParameters}
          onChange={updateField("URLParameter")}
        />
      </div>

      <div css={paramGridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.rest_api.label.headers")}
        </label>
        <FieldArray value={params.Headers} onChange={updateField("Headers")} />
      </div>

      {hasBody && (
        <div css={paramGridRowContainerStyle}>
          <label css={labelTextStyle}>
            {t("editor.action.resource.rest_api.label.body")}
          </label>
          <Body value={params.Body} onChange={updateField("Body")} />
        </div>
      )}

      <div css={paramGridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.rest_api.label.cookies")}
        </label>
        <FieldArray value={params.Cookies} onChange={updateField("Cookies")} />
      </div>
    </div>
  )
}

RESTAPIParam.displayName = "RESTAPIParam"
