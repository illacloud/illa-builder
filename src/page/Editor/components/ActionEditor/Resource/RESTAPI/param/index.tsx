import { FC, useState, useContext } from "react"
import { useTranslation } from "react-i18next"
import { Select } from "@illa-design/select"
import { Input } from "@illa-design/input"
import { FieldArray } from "@/page/Editor/components/ActionEditor/ActionEditorPanel/FieldArray"
import { ActionEditorContext } from "@/page/Editor/components/ActionEditor/context"
import { useSelector } from "react-redux"
import { selectAllActionItem } from "@/redux/action/actionList/actionListSelector"
import { selectAllResource } from "@/redux/action/resource/resourceSelector"
import {
  configContainerCss,
  descriptionCss,
  gridRowContainerCss,
  labelTextCss,
  applyGridColIndex,
} from "@/page/Editor/components/ActionEditor/Resource/style"
import { Body } from "./Body"
import { actionTypeCss } from "./style"
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
      ({ id }) => id === activeActionItemId,
    ) ?? null
  const resource =
    useSelector(selectAllResource).find(({ id }) => id === resourceId) ?? null

  const config = action?.config?.general as RESTAPIParamValues
  const resourceConfig = resource?.config as RESTAPIConfigureValues
  const baseURL = resourceConfig?.BaseURL

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
      setParams({ ...params, [field]: v })
      onChange && onChange(params)
    }
  }

  return (
    <div css={configContainerCss}>
      <div css={gridRowContainerCss}>
        <label css={labelTextCss}>
          {t("editor.action.resource.restApi.label.actionType")}
        </label>
        <div css={actionTypeCss}>
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
        <FieldArray
          value={params.URLParameters}
          onChange={updateField("URLParameter")}
        />
      </div>

      <div css={gridRowContainerCss}>
        <label css={labelTextCss}>
          {t("editor.action.resource.restApi.label.headers")}
        </label>
        <FieldArray value={params.Headers} onChange={updateField("Headers")} />
      </div>

      {hasBody && (
        <div css={gridRowContainerCss}>
          <label css={labelTextCss}>
            {t("editor.action.resource.restApi.label.body")}
          </label>
          <Body value={params.Body} onChange={updateField("Body")} />
        </div>
      )}

      <div css={gridRowContainerCss}>
        <label css={labelTextCss}>
          {t("editor.action.resource.restApi.label.cookies")}
        </label>
        <FieldArray value={params.Cookies} onChange={updateField("Cookies")} />
      </div>
    </div>
  )
}

RESTAPIParam.displayName = "RESTAPIParam"
