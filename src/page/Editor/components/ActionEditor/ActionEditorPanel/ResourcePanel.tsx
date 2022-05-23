import { FC } from "react"
import { Divider } from "@illa-design/divider"
import {
  MySQLPanel,
  RESTAPIPanel,
} from "@/page/Editor/components/ActionEditor/ActionEditorPanel/Resources"
import { Transformer } from "@/page/Editor/components/ActionEditor/ActionEditorPanel/Transformer"
import { EventHandler } from "@/page/Editor/components/ActionEditor/ActionEditorPanel/EventHandler"
import { ResourcePanelProps } from "./interface"

export const ResourcePanel: FC<ResourcePanelProps> = (props) => {
  const { resourceType } = props

  function renderResourceConfig() {
    switch (resourceType) {
      case "MySQL":
        return <MySQLPanel />
      case "REST API":
        return <RESTAPIPanel />
      default:
        return null
    }
  }

  return (
    <>
      {renderResourceConfig()}
      <Transformer />
      <Divider />
      <EventHandler />
    </>
  )
}
