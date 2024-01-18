import MissingResources, {
  MissingResourcesProvider,
} from "@illa-public/missing-resource-module"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  MixpanelTrackProvider,
} from "@illa-public/mixpanel-utils"
import { ActionContent, ActionItem, Resource } from "@illa-public/public-types"
import { FC, memo } from "react"
import { createPortal } from "react-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  getAIAgentIDMapAgent,
  getDashboardTeamAIAgentList,
} from "@/redux/aiAgent/dashboardTeamAIAgentSelector"
import {
  getActionIDMapAction,
  getMissingResourceActionGroupByTutorialOrResourceID,
} from "@/redux/currentApp/action/actionSelector"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import {
  getAllResources,
  getResourceIDMapResource,
} from "@/redux/resource/resourceSelector"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { fetchBatchUpdateAction } from "@/services/action"
import { track } from "@/utils/mixpanelHelper"
import { IMissingResourceModalProps } from "./interface"

const MissingResourceModal: FC<IMissingResourceModalProps> = (props) => {
  const { shown, changeShown } = props
  const resourceIDMapResource = useSelector(getResourceIDMapResource)
  const missingActionsMap = useSelector(
    getMissingResourceActionGroupByTutorialOrResourceID,
  )
  const resourceList = useSelector(getAllResources)
  const aiAgentList = useSelector(getDashboardTeamAIAgentList)
  const actionIDMapAction = useSelector(getActionIDMapAction)
  const agentIDMapAgent = useSelector(getAIAgentIDMapAgent)
  const dispatch = useDispatch()

  const updateActions = async (actionList: ActionItem<ActionContent>[]) => {
    await fetchBatchUpdateAction(actionList)
    dispatch(actionActions.batchUpdateActionItemReducer(actionList))
  }

  const addResourceCallback = (resource: Resource) => {
    dispatch(resourceActions.addResourceItemReducer(resource))
  }

  return (
    shown &&
    createPortal(
      <MixpanelTrackProvider
        basicTrack={track}
        pageName={ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR}
      >
        <MissingResourcesProvider
          resourceIDMapResource={resourceIDMapResource}
          actionIDMapAction={actionIDMapAction}
          missingActionsMap={missingActionsMap}
          resourceList={resourceList}
          aiAgentList={aiAgentList}
          agentIDMapAgent={agentIDMapAgent}
          updateActions={updateActions}
          addResourceCallback={addResourceCallback}
        >
          <MissingResources shown={shown} changeShown={changeShown} />
        </MissingResourcesProvider>
      </MixpanelTrackProvider>,
      document.body,
    )
  )
}

export default memo(MissingResourceModal)
