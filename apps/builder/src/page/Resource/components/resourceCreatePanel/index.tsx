import { FC } from "react"
import { Divider } from "@illa-design/react"
import { ConfigElement } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements"
import { ConfigElementProvider } from "../../../App/components/Actions/ResourceGenerator/ConfigElements/provider"
import { Header } from "../resourceHeader"
import { TipPanel } from "../tipPanel"
import { ResourceCreatePanelProps } from "./interface"
import {
  containerStyle,
  innerContainerStyle,
  outerContainerStyle,
} from "./style"

export const ResourceCreatePanel: FC<ResourceCreatePanelProps> = (props) => {
  const { resourceType, resourceID, handleOnFinished, handleOnClickBack } =
    props
  return (
    <ConfigElementProvider
      resourceType={resourceType}
      resourceID={resourceID}
      onFinished={handleOnFinished}
    >
      <div css={innerContainerStyle}>
        <Header resourceType={resourceType} onClickBack={handleOnClickBack} />
        <Divider />
        <div css={outerContainerStyle}>
          <div css={containerStyle}>
            <ConfigElement
              resourceType={resourceType}
              resourceID={resourceID}
            />
            <TipPanel resourceType={resourceType} />
          </div>
        </div>
      </div>
    </ConfigElementProvider>
  )
}
