import { LoaderFunction, redirect } from "react-router-dom"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { fetchResources } from "@/services/resource"
import store from "@/store"

export const getDashboardResourcesLoader: LoaderFunction = async ({
  request,
}) => {
  try {
    const response = await fetchResources(request.signal)
    store.dispatch(resourceActions.updateResourceListReducer(response.data))
    return null
  } catch {
    return redirect("/500")
  }
}
