import { LoaderFunction, redirect } from "react-router-dom"
import { currentAppHistoryActions } from "@/redux/currentAppHistory/currentAppHistorySlice"
import { fetchSnapShotList } from "@/services/history"
import store from "@/store"

const INITIAL_PAGE = 1
export const historyLoader: LoaderFunction = async (args) => {
  const { appId } = args.params
  if (!appId) {
    return redirect("/404")
  }
  try {
    const { data } = await fetchSnapShotList({
      page: INITIAL_PAGE,
      appID: appId,
      signal: args.request.signal,
    })
    const currentSnapshotID = data.snapshotList[0].snapshotID
    store.dispatch(
      currentAppHistoryActions.initCurrentAppHistoryReducer({
        ...data,
        hasMore: data.totalPages !== INITIAL_PAGE,
        currentPage: INITIAL_PAGE,
        currentSnapshotID,
      }),
    )
    return null
  } catch (e) {
    return redirect("/404")
  }
}
