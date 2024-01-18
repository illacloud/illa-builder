import MissingResources, {
  MissingResourcesProvider,
} from "@illa-public/missing-resource-module"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  MixpanelTrackProvider,
} from "@illa-public/mixpanel-utils"
import { ActionContent, ActionItem, Resource } from "@illa-public/public-types"
import {
  ForwardRefRenderFunction,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react"
import { createPortal } from "react-dom"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { QuestionCircleIcon, getColor } from "@illa-design/react"
import {
  getAIAgentIDMapAgent,
  getDashboardTeamAIAgentList,
} from "@/redux/aiAgent/dashboardTeamAIAgentSelector"
import {
  getActionIDMapAction,
  getHasMissingResourceAction,
  getMissingResourceActionGroupByTutorialOrResourceID,
} from "@/redux/currentApp/action/actionSelector"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import {
  getAllResources,
  getResourceIDMapResource,
} from "@/redux/resource/resourceSelector"
import { fetchBatchUpdateAction } from "@/services/action"
import { track } from "@/utils/mixpanelHelper"
import { resourceActions } from "../../../../../redux/resource/resourceSlice"
import { missingButtonStyle } from "./style"

export interface MissingTipButtonMethod {
  changeShown: (shown: boolean) => void
}

export const ResourceMissingTipButton: ForwardRefRenderFunction<
  MissingTipButtonMethod,
  {}
> = (_props, ref) => {
  const hasMissingResources = useSelector(getHasMissingResourceAction)
  const resourceIDMapResource = useSelector(getResourceIDMapResource)
  const missingActionsMap = useSelector(
    getMissingResourceActionGroupByTutorialOrResourceID,
  )
  const resourceList = useSelector(getAllResources)
  const aiAgentList = useSelector(getDashboardTeamAIAgentList)
  const actionIDMapAction = useSelector(getActionIDMapAction)
  const agentIDMapAgent = useSelector(getAIAgentIDMapAgent)
  const [shown, setShown] = useState(hasMissingResources)
  const { t } = useTranslation()
  const dispatch = useDispatch()

  useEffect(() => {
    setShown(hasMissingResources)
  }, [hasMissingResources])

  useImperativeHandle(ref, () => {
    return {
      changeShown: setShown,
    }
  })

  const updateActions = async (actionList: ActionItem<ActionContent>[]) => {
    dispatch(actionActions.batchUpdateActionItemReducer(actionList))
    await fetchBatchUpdateAction(actionList)
  }

  const addResourceCallback = (resource: Resource) => {
    dispatch(resourceActions.addResourceItemReducer(resource))
  }

  return (
    hasMissingResources && (
      <>
        <button
          css={missingButtonStyle}
          onClick={() => {
            setShown(true)
          }}
        >
          <QuestionCircleIcon color={getColor("orange", "03")} size="16px" />
          {t("flow.editor.app.tooltips.missing_resources")}
        </button>
        {shown &&
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
                <MissingResources shown={shown} changeShown={setShown} />
              </MissingResourcesProvider>
            </MixpanelTrackProvider>,
            document.body,
          )}
      </>
    )
  )
}

export default forwardRef(ResourceMissingTipButton)
