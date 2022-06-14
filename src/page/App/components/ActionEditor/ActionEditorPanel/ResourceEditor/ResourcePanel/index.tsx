import { useSelector, useDispatch } from "react-redux"
import { forwardRef, useState, useImperativeHandle, useContext } from "react"
import { Divider } from "@illa-design/divider"
import { Api } from "@/api/base"
import { ParamValues } from "@/page/App/components/ActionEditor/Resource"
import { ActionItemConfig } from "@/redux/currentApp/action/actionState"
import { selectAllResource } from "@/redux/currentApp/resource/resourceSelector"
import { selectAllActionItem } from "@/redux/currentApp/action/actionSelector"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { Transformer } from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor/Transformer"
import { ActionEditorContext } from "@/page/App/components/ActionEditor/context"
import { ResourceParams } from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor/ResourceParams"
import { EventHandler } from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor/EventHandler"
import { triggerRunRef } from "@/page/App/components/ActionEditor/ActionEditorPanel/interface"
import { ActionEditorPanelContext } from "@/page/App/components/ActionEditor/ActionEditorPanel/context"
import { ResourcePanelProps } from "./interface"

export const ResourcePanel = forwardRef<triggerRunRef, ResourcePanelProps>(
  (props, ref) => {
    const { resourceId, onChange, onSave, onRun } = props

    const { activeActionItemId } = useContext(ActionEditorContext)
    const { onLoadingActionResult } = useContext(ActionEditorPanelContext)
    const activeActionItem = useSelector(selectAllActionItem).find(
      ({ actionId: id }) => id === activeActionItemId,
    )
    const allResource = useSelector(selectAllResource)
    const dispatch = useDispatch()

    let resourceType: string
    let resource

    const [params, setParams] = useState<
      Pick<ActionItemConfig, "general" | "transformer" | "eventHandler">
    >({
      general: {},
      transformer: "",
      eventHandler: {},
    })

    resource = useSelector(selectAllResource).find(
      (i) => i.resourceId === resourceId,
    )

    const onParamsChange = (value: ParamValues) => {
      setParams({ ...params, general: value })
      onChange?.()
    }

    const run = () => {
      Api.request(
        {
          url: `/actions/${activeActionItemId}/run`,
          method: "POST",
          data: {
            actionType: activeActionItem?.actionType,
          },
        },
        (data) => {
          const { config, request, ...response } = data
          // TODO: get restapi request params
          const apiRequestParams = {
            url: "",
            method: "",
            body: "",
            headers: {},
          }
          onRun && onRun({ request: apiRequestParams, response })
        },
        () => { },
        () => { },
        (loading) => {
          onLoadingActionResult?.(loading)
        },
      )
    }

    const saveAndRun = () => {
      run()

      dispatch(
        actionActions.updateActionItemReducer({
          ...activeActionItem,
          resourceId,
          actionTemplate: {
            ...activeActionItem?.config,
            ...params,
          },
        }),
      )

      onSave?.()
    }

    useImperativeHandle(ref, () => {
      return { run, saveAndRun }
    })

    resource = allResource.find((i) => i.resourceId === resourceId)
    resourceType = resource?.resourceType ?? ""

    return (
      <>
        <div>
          <ResourceParams
            resourceType={resourceType}
            onChange={onParamsChange}
          />
          <Transformer />
          <Divider />
          <EventHandler />
        </div>
      </>
    )
  },
)

ResourcePanel.displayName = "ResourcePanel"
