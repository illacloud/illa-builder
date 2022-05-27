import { FC, useContext } from "react"
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
  let resourceType: string
  let resource
  const allResource = useSelector(selectAllResource)

  if (resourceId?.indexOf("preset") !== -1) {
    resourceType = resourceId?.split("_")[1] ?? ""
  } else {
    resource = allResource.find((i) => i.id === resourceId)
    resourceType = resource?.type ?? ""
  }

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

ResourcePanel.displayName = "ResourcePanel"
