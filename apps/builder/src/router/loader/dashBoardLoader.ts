import {
  MARKET_AGENT_SORTED_OPTIONS,
  fetchMarketAgentList,
} from "@illa-public/market-agent/service"
import { fetchAppList } from "@illa-public/market-app"
import { PRODUCT_SORT_BY } from "@illa-public/market-app/service/interface"
import { LoaderFunction, defer } from "react-router-dom"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { dashboardMarketAgentActions } from "@/redux/dashboard/marketAIAgents/marketAgentSlice"
import { dashboardMarketAppActions } from "@/redux/dashboard/marketApps/marketAppSlice"
import { dashboardTeamAiAgentActions } from "@/redux/dashboard/teamAiAgents/dashboardTeamAiAgentSlice"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { fetchTeamAgentList } from "@/services/agent"
import { fetchTeamAppList } from "@/services/apps"
import { fetchResources } from "@/services/resource"
import store from "@/store";


export const getDashboardAppLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const sort =
    (url.searchParams.get("sort") as PRODUCT_SORT_BY) ?? PRODUCT_SORT_BY.POPULAR
  const list = url.searchParams.get("list") ?? "team"
  const keywords = url.searchParams.get("keywords") ?? ""

  return defer({
    request:
      list === "team"
        ? fetchTeamAppList(request.signal).then((res) => {
            store.dispatch(
              dashboardAppActions.updateDashboardAppListReducer(res.data),
            )
            return res.data
          })
        : fetchAppList({
            page: 1,
            limit: 40,
            sortedBy: sort as PRODUCT_SORT_BY,
            search: keywords,
          }).then((res) => {
            store.dispatch(
              dashboardMarketAppActions.updateMarketAppListReducer(
                res.data.products,
              ),
            )
            return res.data
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

export const getDashboardAiAgentLoader: LoaderFunction = async ({
  request,
}) => {
  const url = new URL(request.url)
  const sort =
    (url.searchParams.get("sort") as MARKET_AGENT_SORTED_OPTIONS) ??
    MARKET_AGENT_SORTED_OPTIONS.POPULAR
  const list = url.searchParams.get("list") ?? "team"
  const keywords = url.searchParams.get("keywords") ?? ""

  return defer({
    request:
      list === "team"
        ? fetchTeamAgentList(keywords, request.signal).then((res) => {
            store.dispatch(
              dashboardTeamAiAgentActions.updateTeamAiAgentListReducer(
                res.data.aiAgentList,
              ),
            )
            return res.data
          })
        : fetchMarketAgentList(1, sort, keywords, 40, request.signal).then(
            (res) => {
              store.dispatch(
                dashboardMarketAgentActions.updateMarketAgentListReducer(
                  res.data.products,
                ),
              )
              return res.data
            },
          ),
  })
}