import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@illa-public/mixpanel-utils"
import { isCloudVersion } from "@illa-public/utils"
import { Unsubscribe } from "@reduxjs/toolkit"
import { AxiosResponse } from "axios"
import { FC, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useAsyncValue, useBeforeUnload } from "react-router-dom"
import { TriggerProvider } from "@illa-design/react"
import { useDestroyApp } from "@/hooks/useDestoryExecutionTree"
import { fixedActionToNewAction } from "@/hooks/utils/fixedAction"
import { fixedComponentsToNewComponents } from "@/hooks/utils/fixedComponents"
import { configActions } from "@/redux/config/configSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { appInfoActions } from "@/redux/currentApp/appInfo/appInfoSlice"
import { setupComponentsListeners } from "@/redux/currentApp/editor/components/componentsListener"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { setupExecutionListeners } from "@/redux/currentApp/executionTree/executionListener"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { dashboardTeamAIAgentActions } from "@/redux/dashboard/teamAIAgents/dashboardTeamAIAgentSlice"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { Resource, ResourceContent } from "@/redux/resource/resourceState"
import { TeamAgentListData } from "@/services/agent"
import { startAppListening } from "@/store"
import {
  track,
  trackPageDurationEnd,
  trackPageDurationStart,
} from "@/utils/mixpanelHelper"
import { CanvasPanel } from "../App/components/CanvasPanel"
import { CurrentAppResp } from "../App/resp/currentAppResp"

interface IDeployContentAsyncValue {
  isPublic: boolean
  appInfo: Promise<AxiosResponse<CurrentAppResp>>
  resourceInfo: Promise<AxiosResponse<Resource<ResourceContent>[]>>
  teamAgentList: Promise<AxiosResponse<TeamAgentListData>>
}

export const DeployContent: FC = () => {
  const asyncValue = useAsyncValue() as IDeployContentAsyncValue
  const dispatch = useDispatch()

  useEffect(() => {
    const subscriptions: Unsubscribe[] = [
      setupComponentsListeners(startAppListening),
      setupExecutionListeners(startAppListening),
    ]
    return () => subscriptions.forEach((unsubscribe) => unsubscribe())
  }, [])

  useEffect(() => {
    const {
      resourceInfo: resourceResponse,
      appInfo: appInfoResponse,
      teamAgentList,
    } = asyncValue
    const initApp = async () => {
      const appInfo = await appInfoResponse
      if (!asyncValue.isPublic) {
        const resourceInfo = await resourceResponse
        dispatch(resourceActions.updateResourceListReducer(resourceInfo.data))
        if (isCloudVersion) {
          const agentList = await teamAgentList
          dispatch(
            dashboardTeamAIAgentActions.updateTeamAIAgentListReducer(
              agentList.data.aiAgentList,
            ),
          )
        }
        dispatch(configActions.updateIllaMode("production"))
        dispatch(appInfoActions.updateAppInfoReducer(appInfo.data.appInfo))
        const fixedComponents = fixedComponentsToNewComponents(
          appInfo.data.components,
        )
        dispatch(componentsActions.initComponentReducer(fixedComponents))
        const fixedActions = fixedActionToNewAction(appInfo.data.actions)
        dispatch(actionActions.initActionListReducer(fixedActions))
        dispatch(executionActions.startExecutionReducer())
      } else {
        dispatch(configActions.updateIllaMode("production"))
        dispatch(appInfoActions.updateAppInfoReducer(appInfo.data.appInfo))
        const fixedComponents = fixedComponentsToNewComponents(
          appInfo.data.components,
        )
        dispatch(componentsActions.initComponentReducer(fixedComponents))
        const fixedActions = fixedActionToNewAction(appInfo.data.actions)
        dispatch(actionActions.initActionListReducer(fixedActions))
        dispatch(executionActions.startExecutionReducer())
      }
    }
    initApp()
  }, [asyncValue, dispatch])

  useDestroyApp()

  useEffect(() => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.VISIT,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.DEPLOY,
    )
    trackPageDurationStart()
    return () => {
      trackPageDurationEnd(ILLA_MIXPANEL_BUILDER_PAGE_NAME.DEPLOY)
    }
  }, [])

  useBeforeUnload(() => {
    trackPageDurationEnd(ILLA_MIXPANEL_BUILDER_PAGE_NAME.DEPLOY)
  })

  return (
    <TriggerProvider renderInBody zIndex={10}>
      {<CanvasPanel />}
    </TriggerProvider>
  )
}
