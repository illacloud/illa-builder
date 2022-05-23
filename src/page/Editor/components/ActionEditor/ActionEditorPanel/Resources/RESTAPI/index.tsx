import { FC, useState } from "react"
import { Select } from "@illa-design/select"
import { Input } from "@illa-design/input"
import { Divider } from "@illa-design/divider"
import { Transformer } from "@/page/Editor/components/ActionEditor/ActionEditorPanel/Transformer"
import { EventHandler } from "@/page/Editor/components/ActionEditor/ActionEditorPanel/EventHandler"
import { FieldArray } from "@/page/Editor/components/ActionEditor/ActionEditorPanel/FieldArray"
import { Body } from "./Body"
import {
  ConfigContainerCSS,
  DescriptionCSS,
  GridRowContainerCSS,
  LabelTextCSS,
  applyGridColIndex,
} from "../style"
import { ActionTypeCSS } from "./style"
import { RESTAPIPanelProps } from "./interface"

export const RESTAPIPanel: FC<RESTAPIPanelProps> = (props) => {
  const [method, setMethod] = useState("GET")
  const hasBody = method.indexOf("GET") === -1
  return (
    <div css={ConfigContainerCSS}>
      <div css={GridRowContainerCSS}>
        <label css={LabelTextCSS}>Action Type</label>
        <div css={ActionTypeCSS}>
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
        <dd css={[applyGridColIndex(2), DescriptionCSS]}>
          (GET REQ) WILL RUN AUTOMATICALLY WHENEVER A PARAMETER CHANGES.
        </dd>
      </div>

      <div css={GridRowContainerCSS}>
        <label css={LabelTextCSS}>URL Parameters</label>
        <FieldArray />
      </div>

      <div css={GridRowContainerCSS}>
        <label css={LabelTextCSS}>Headers</label>
        <FieldArray />
      </div>

      {hasBody && (
        <div css={GridRowContainerCSS}>
          <label css={LabelTextCSS}>Body</label>
          <Body />
        </div>
      )}

      <div css={GridRowContainerCSS}>
        <label css={LabelTextCSS}>Cookies</label>
        <FieldArray />
      </div>

      <Transformer />

      <Divider />

      <EventHandler />
    </div>
  )
}
