import { FC, useState } from "react"
import { css } from "@emotion/react"
import { useTranslation } from "react-i18next"
import { Select } from "@illa-design/select"
import { Input } from "@illa-design/input"
import { FieldArray } from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor/FieldArray"
import { useSelector } from "react-redux"
import { getSelectedAction } from "@/redux/config/configSelector"
import { selectAllResource } from "@/redux/resource/resourceSelector"
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
  Params,
} from "../interface"

function concatUrl(
  path: string = "",
  urlParams: Params[] = [],
  baseUrl?: string,
) {
  const params = urlParams.map(({ key, value }) => `${key}=${value}`).join("&")
  const url = params ? `${path}?${params}` : path
  return baseUrl ? `${baseUrl}/${url}` : url
}

export const RESTAPIParam: FC<RESTAPIParamProps> = (props) => {
  const { onChange } = props
  const { t } = useTranslation()
  const { resourceId, actionTemplate } = useSelector(getSelectedAction)
  const resource =
    useSelector(selectAllResource).find(
      ({ resourceId: id }) => id === resourceId,
    ) ?? null

  const config = actionTemplate as RESTAPIParamValues
  const resourceConfig = resource?.options as RESTAPIConfigureValues
  const baseURL = resourceConfig?.baseURL

  const [params, setParams] = useState({
    method: config?.method ?? "GET",
    path: config?.path,
    urlParams: config?.urlParams ?? [],
    url: concatUrl(config?.path, config?.urlParams, baseURL),
    headers: config?.headers ?? [],
    body: config?.body ?? [],
    cookies: config?.cookies ?? [],
  })

  const hasBody = params.method.indexOf("GET") === -1

  function updateField(field: string) {
    return (v: any) => {
      setParams((preParam) => {
        const newParam = { ...preParam, [field]: v }

        if (["path", "urlParams"].includes(field)) {
          newParam.url = concatUrl(newParam.path, newParam.urlParams, baseURL)
        }
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
          value={params.urlParams}
          onChange={updateField("urlParams")}
        />
      </div>

      <div css={paramGridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.rest_api.label.headers")}
        </label>
        <FieldArray value={params.headers} onChange={updateField("headers")} />
      </div>

      {hasBody && (
        <div css={paramGridRowContainerStyle}>
          <label css={labelTextStyle}>
            {t("editor.action.resource.rest_api.label.body")}
          </label>
          <Body value={params.body} onChange={updateField("body")} />
        </div>
      )}

      <div css={paramGridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.rest_api.label.cookies")}
        </label>
        <FieldArray value={params.cookies} onChange={updateField("cookies")} />
      </div>
    </div>
  )
}

RESTAPIParam.displayName = "RESTAPIParam"
