import { useSelector, useDispatch } from "react-redux"
import { forwardRef, useState, useImperativeHandle, useContext } from "react"
import { Divider } from "@illa-design/divider"
import { Api } from "@/api/base"
import { ParamValues } from "@/page/App/components/ActionEditor/Resource"
import { ActionItemConfig } from "@/redux/currentApp/action/actionState"
import { selectAllResource } from "@/redux/currentApp/resource/resourceSelector"
import { getSelectedAction } from "@/redux/currentApp/config/configSelector"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { Transformer } from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor/Transformer"
import { ResourceParams } from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor/ResourceParams"
import { EventHandler } from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor/EventHandler"
import { triggerRunRef } from "@/page/App/components/ActionEditor/ActionEditorPanel/interface"
import { ActionEditorPanelContext } from "@/page/App/components/ActionEditor/ActionEditorPanel/context"
import { ResourcePanelProps, ReturnRequestProp } from "./interface"

export const ResourcePanel = forwardRef<triggerRunRef, ResourcePanelProps>(
  (props, ref) => {
    const { resourceId, onChange, onSave, onRun } = props

    const { onLoadingActionResult } = useContext(ActionEditorPanelContext)
    const activeActionItem = useSelector(getSelectedAction)
    const allResource = useSelector(selectAllResource)
    const dispatch = useDispatch()

    let resourceType: string
    let resource

    const [params, setParams] = useState<ActionItemConfig>({
      transformer: "",
      events: [],
    })

    resource = useSelector(selectAllResource).find(
      (i) => i.resourceId === resourceId,
    )

    const onParamsChange = (value: ParamValues) => {
      setParams({ ...params, ...value })
      onChange?.()
    }

    const run = () => {
      let request: ReturnRequestProp

      // return request params as result if is `api` action type
      if (
        activeActionItem &&
        ["restapi"].includes(activeActionItem.actionType)
      ) {
        const { url, method, body, headers } = params
        request = {
          url,
          method,
          body,
          headers,
        }
      }

      Api.request(
        {
          url: `/actions/${activeActionItem?.actionId}/run`,
          method: "POST",
          data: {
            actionType: activeActionItem?.actionType,
          },
        },
        ({ data, statusText, headers }) => {
          dispatch(
            actionActions.updateActionItemReducer({
              ...activeActionItem,
              data,
              error: false,
            }),
          )

          onRun && onRun({ response: { data, statusText, headers }, request })
        },
        ({ data, statusText, headers }) => {
          dispatch(
            actionActions.updateActionItemReducer({
              ...activeActionItem,
              data: {},
              error: true,
            }),
          )
          onRun && onRun({ response: { data, statusText, headers }, request })
        },
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
            ...activeActionItem?.actionTemplate,
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
