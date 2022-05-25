import { FC } from "react"
import { Divider } from "@illa-design/divider"
import {
  MySQLPanel,
  RESTAPIPanel,
} from "@/page/Editor/components/ActionEditor/ActionEditorPanel/Resources"
import { selectAllResource } from "@/redux/action/resource/resourceSelector"
import { useSelector } from "react-redux"
import { Transformer } from "@/page/Editor/components/ActionEditor/ActionEditorPanel/Transformer"
import { EventHandler } from "./EventHandler"
import { ResourcePanelProps } from "./interface"

export const ResourcePanel: FC<ResourcePanelProps> = (props) => {
  const { resourceId } = props

  const resource = useSelector(selectAllResource).find((i) => i.id === resourceId);
  const resourceType = resource?.type

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
