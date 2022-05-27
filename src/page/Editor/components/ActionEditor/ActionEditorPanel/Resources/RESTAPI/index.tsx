import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { Select } from "@illa-design/select"
import { Input } from "@illa-design/input"
import { FieldArray } from "@/page/Editor/components/ActionEditor/ActionEditorPanel/FieldArray"
import { Body } from "./Body"
import {
  configContainerCss,
  descriptionCss,
  gridRowContainerCss,
  labelTextCss,
  applyGridColIndex,
} from "../style"
import { actionTypeCss } from "./style"
import { RESTAPIPanelProps } from "./interface"

export const RESTAPIPanel: FC<RESTAPIPanelProps> = () => {
  const { t } = useTranslation()
  const [method, setMethod] = useState("GET")
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
            placeholder={t(
              "editor.action.resource.restApi.placeholder.actionUrlPath",
            )}
            addonBefore={{ render: "https://rest-sandbox.coinapi.io/" }}
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
        <FieldArray />
      </div>

      <div css={gridRowContainerCss}>
        <label css={labelTextCss}>
          {t("editor.action.resource.restApi.label.headers")}
        </label>
        <FieldArray />
      </div>

      {hasBody && (
        <div css={gridRowContainerCss}>
          <label css={labelTextCss}>
            {t("editor.action.resource.restApi.label.body")}
          </label>
          <Body />
        </div>
      )}

      <div css={gridRowContainerCss}>
        <label css={labelTextCss}>
          {t("editor.action.resource.restApi.label.cookies")}
        </label>
        <FieldArray />
      </div>
    </div>
  )
}
