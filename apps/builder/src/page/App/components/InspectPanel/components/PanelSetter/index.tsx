import { FC } from "react"
import { Setter } from "@/page/App/components/InspectPanel/setter"
import { RenderPanelSetterProps } from "./interface"

const RenderPanelSetter: FC<RenderPanelSetterProps> = (props) => {
  const { config, displayName, isInList = false, parentAttrName } = props
  const { id } = config
  return (
    <Setter
      key={`${id}-${displayName}`}
      {...config}
      isInList={isInList}
      parentAttrName={parentAttrName}
      displayName={displayName}
    />
  )
}

RenderPanelSetter.displayName = "RenderPanelSetter"

export default RenderPanelSetter
