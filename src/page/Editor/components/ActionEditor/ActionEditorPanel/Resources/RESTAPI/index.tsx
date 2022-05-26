import { FC, useState } from "react"
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
  const [method, setMethod] = useState("GET")
  const hasBody = method.indexOf("GET") === -1

  return (
    <div css={configContainerCss}>
      <div css={gridRowContainerCss}>
        <label css={labelTextCss}>Action Type</label>
        <div css={actionTypeCss}>
          <Select
            value={method}
            onChange={setMethod}
            options={["GET", "POST", "PUT", "DELETE", "PATCH"]}
            size={"small"}
          />
          <Input
            placeholder={"api / v2 / endpoint . json"}
            addonBefore={{ render: "https://rest-sandbox.coinapi.io/" }}
          />
        </div>
        <dd css={[applyGridColIndex(2), descriptionCss]}>
          (GET REQ) WILL RUN AUTOMATICALLY WHENEVER A PARAMETER CHANGES.
        </dd>
      </div>

      <div css={gridRowContainerCss}>
        <label css={labelTextCss}>URL Parameters</label>
        <FieldArray />
      </div>

      <div css={gridRowContainerCss}>
        <label css={labelTextCss}>Headers</label>
        <FieldArray />
      </div>

      {hasBody && (
        <div css={gridRowContainerCss}>
          <label css={labelTextCss}>Body</label>
          <Body />
        </div>
      )}

      <div css={gridRowContainerCss}>
        <label css={labelTextCss}>Cookies</label>
        <FieldArray />
      </div>
    </div>
  )
}
