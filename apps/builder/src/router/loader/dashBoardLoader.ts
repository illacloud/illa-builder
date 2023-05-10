import { LoaderFunction, defer } from "react-router-dom"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { fetchAppList } from "@/services/apps"
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
