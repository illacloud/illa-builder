import { get } from "lodash-es"
import { FC } from "react"
import {
  getHashCode,
  getPreColor,
} from "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/utils"
import { getSafeStringValue } from "../../utils"
import TagContainer from "../TagContainer"
import { MorePanelProps } from "./interface"
import { panelContainerStyle } from "./style"

const MorePanel: FC<MorePanelProps> = ({
  values,
  tagColorMap,
  handleOnSelect,
}) => {
  return (
    <div css={panelContainerStyle}>
      {values.map((v, i) => {
        const s = getSafeStringValue(v)
        const c = get(tagColorMap, s) ?? getPreColor(getHashCode(s))
        if (!s) return null
        return (
          <TagContainer
            key={`${v}${i}`}
            c={c}
            v={s}
            handleOnSelect={handleOnSelect}
          />
        )
      })}
    </div>
  )
}

export default MorePanel
