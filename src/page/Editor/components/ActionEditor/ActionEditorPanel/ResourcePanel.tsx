import { forwardRef, useState, useImperativeHandle } from "react"
import { Divider } from "@illa-design/divider"
import {
  MySQLPanel,
  RESTAPIPanel,
} from "@/page/Editor/components/ActionEditor/ActionEditorPanel/Resources"
import { selectAllResource } from "@/redux/action/resource/resourceSelector"
import { useSelector } from "react-redux"
import { Transformer } from "@/page/Editor/components/ActionEditor/ActionEditorPanel/Transformer"
import { EventHandler } from "./EventHandler"
import { ResourcePanelProps, triggerRunRef } from "./interface"
import Api from "@/api/api"

const dataTransform = (data: any) => {
  const _data = {
    resourceId: "04813000-438f-468e-a8c1-d34518b6c2fa",
    type: "SQLQuery",
    name: "sqlEg",
    actionTemplate: {
      mode: "sql",
      query: "select * from users limit 100",
      enableTransformer: false,
      transformer:
        "// The variable 'data' allows you to reference the request's data in the transformer. \n// example: return data.find(element => element.isError)\nreturn data.error",
      events: [],
    },
  }
  _data.actionTemplate.query = data.general?.query
  return _data
}

export const ResourcePanel = forwardRef<triggerRunRef, ResourcePanelProps>(
  (props, ref) => {
    const { resourceId } = props
    const [params, setParams] = useState({
      general: {},
      transformer: "",
      eventHandlers: [],
    })

    // different resource has different params, so define the type any
    const onParamsChange = (value: any) => {
      console.log(value, "val")
      setParams({ ...params, general: value })
    }

    const onRunAndSave = () => {
      const _data = dataTransform(params)
      Api.post("/api/v1/actions/:id/run", _data)
    }

    useImperativeHandle(ref, () => {
      return { onRun: onRunAndSave }
    })
    const resource = useSelector(selectAllResource).find(
      (i) => i.id === resourceId,
    )
    const resourceType = resource?.type

    function renderResourceConfig() {
      switch (resourceType) {
        case "MySQL":
          return <MySQLPanel onParamsChange={onParamsChange} />
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
  },
)

ResourcePanel.displayName = "ResourcePanel"
