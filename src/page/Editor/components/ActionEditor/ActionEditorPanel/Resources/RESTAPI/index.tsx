import { FC } from "react"
import { Select } from "@illa-design/select"
import { Input } from "@illa-design/input"
import { Divider } from "@illa-design/divider"
import {
  ConfigContainerCSS,
  DescriptionCSS,
  GridRowContainerCSS,
  LabelTextCSS,
  applyGridColIndex
} from "../style"
import { ActionTypeCSS } from "./style"
import { RESTAPIPanelProps } from "./interface"
import { Transformer } from "@/page/Editor/components/ActionEditor/ActionEditorPanel/Transformer"


export const RESTAPIPanel: FC<RESTAPIPanelProps> = (props) => {
  return (
    <div css={ConfigContainerCSS}>
      <div css={GridRowContainerCSS}>
        <label css={LabelTextCSS}>Action Type</label>
        <div css={ActionTypeCSS}>
          <Select
            value={"GET"}
            options={["GET", "POST", "PUT", "DELETE", "PATCh"]}
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
      </div>

      <div css={GridRowContainerCSS}>
        <label css={LabelTextCSS}>Headers</label>
      </div>

      <div css={GridRowContainerCSS}>
        <label css={LabelTextCSS}>Body</label>
      </div>

      <div css={GridRowContainerCSS}>
        <label css={LabelTextCSS}>Cookies</label>
      </div>

      <Transformer />

      <Divider />
    </div>
  )
}
