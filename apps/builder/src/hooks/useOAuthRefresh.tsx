import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { getOAuthRefreshData } from "@/services/resource"

export const useOAuthRefresh = (resourceID?: string) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (resourceID == undefined) {
      return
    }
    const controller = new AbortController()
    getOAuthRefreshData(resourceID, controller.signal).then((response) => {
      const resourceData = response.data
      dispatch(resourceActions.updateResourceItemReducer(resourceData))
    })
    return () => {
      controller.abort()
    }
  }, [dispatch, resourceID])
}
