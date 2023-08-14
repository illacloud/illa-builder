import { LoaderFunction, defer } from "react-router-dom"
import {
  MARKET_DEFAULT_SORT,
  MARKET_INITIAL_PAGE,
  MARKET_PAGE_SIZE,
} from "@/page/Dashboard/DashboardAiAgent/context"
import { Agent } from "@/redux/aiAgent/aiAgentState"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { dashboardMarketAiAgentActions } from "@/redux/dashboard/marketAiAgents/dashboardMarketAiAgentSlice"
import { dashboardTeamAiAgentActions } from "@/redux/dashboard/teamAiAgents/dashboardTeamAiAgentSlice"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { fetchTeamAgent } from "@/services/agent"
import { fetchAppList } from "@/services/apps"
import { MarketAgentList, fetchNeedAuthAgentList } from "@/services/marketPlace"
import { fetchResources } from "@/services/resource"
import store from "@/store"

export const getDashboardAppLoader: LoaderFunction = async ({ request }) => {
  return defer({
    appList: fetchAppList(request.signal).then((res) => {
      store.dispatch(
        dashboardAppActions.updateDashboardAppListReducer(res.data),
      )
      return res
    }),
  })
}

export const getDashboardResourcesLoader: LoaderFunction = async ({
  request,
}) => {
  return defer({
    resourceList: fetchResources(request.signal).then((res) => {
      store.dispatch(resourceActions.updateResourceListReducer(res.data))
      return res
    }),
  })
}

export interface DashboardAiAgentLoaderData {
  teamAgentList: Agent[]
  marketAgentData: MarketAgentList
}

export const getDashboardAiAgentLoader: LoaderFunction = async ({
  request,
}) => {
  return defer({
    teamAgentList: fetchTeamAgent(request.signal).then((res) => {
      store.dispatch(
        dashboardTeamAiAgentActions.updateTeamAiAgentListReducer(
          res.data.aiAgentList,
        ),
      )
      return res.data
    }),
    marketAgentList: fetchNeedAuthAgentList(
      {
        page: MARKET_INITIAL_PAGE,
        limit: MARKET_PAGE_SIZE,
        sortedBy: MARKET_DEFAULT_SORT,
      },
      request.signal,
    ).then((res) => {
      store.dispatch(
        dashboardMarketAiAgentActions.initMarketAiAgentListReducer(res.data),
      )
      return res.data
    }),
  })
}
