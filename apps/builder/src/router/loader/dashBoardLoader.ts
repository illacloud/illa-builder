import { LoaderFunction, defer } from "react-router-dom"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { fetchResources } from "@/services/resource"
import store from "@/store"

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
