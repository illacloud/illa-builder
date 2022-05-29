import Api from "@/api/api"
import { forwardRef, useState, useImperativeHandle, useContext } from "react"
import { Divider } from "@illa-design/divider"
import {
  RESTAPIParamValues,
  RESTAPIParam,
  MySQLParamValues,
  MySQLParam,
} from "@/page/Editor/components/ActionEditor/Resource"
import { ActionItemConfig } from "@/redux/action/actionList/actionListState"
import { selectAllResource } from "@/redux/action/resource/resourceSelector"
import { selectAllActionItem } from "@/redux/action/actionList/actionListSelector"
import { actionListActions } from "@/redux/action/actionList/actionListSlice"
import { useSelector, useDispatch } from "react-redux"
import { Transformer } from "@/page/Editor/components/ActionEditor/ActionEditorPanel/Transformer"
import { ActionEditorContext } from "@/page/Editor/components/ActionEditor/context"
import { EventHandler } from "./EventHandler"
import { ResourcePanelProps, triggerRunRef } from "./interface"

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
    const { resourceId, onChange } = props
    const { activeActionItemId } = useContext(ActionEditorContext)
    let resourceType: string
    let resource
    const activeActionItem = useSelector(selectAllActionItem).find(
      ({ id }) => id === activeActionItemId,
    )
    const allResource = useSelector(selectAllResource)
    const dispatch = useDispatch()

    const [params, setParams] = useState<
      Pick<ActionItemConfig, "general" | "transformer" | "eventHandler">
    >({
      general: {},
      transformer: {
        value: "",
        enable: false,
      },
      eventHandler: {},
    })

    resource = useSelector(selectAllResource).find((i) => i.id === resourceId)

    const onParamsChange = (value: RESTAPIParamValues | MySQLParamValues) => {
      setParams({ ...params, general: value })
      onChange && onChange()
    }

    const onRunAndSave = () => {
      const _data = dataTransform(params)
      Api.post("/api/v1/actions/:id/run", _data)

      dispatch(
        actionListActions.updateActionItemReducer({
          ...activeActionItem,
          resourceId,
          config: {
            ...activeActionItem?.config,
            ...params,
          },
        }),
      )
    }

    useImperativeHandle(ref, () => {
      return { onRun: onRunAndSave }
    })

    if (resourceId?.indexOf("preset") !== -1) {
      resourceType = resourceId?.split("_")[1] ?? ""
    } else {
      resource = allResource.find((i) => i.id === resourceId)
      resourceType = resource?.type ?? ""
    }

    function renderResourceConfig() {
      switch (resourceType) {
        case "MySQL":
          return <MySQLParam onChange={onParamsChange} />
        case "REST API":
          return <RESTAPIParam onChange={onParamsChange} />
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
