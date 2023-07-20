import { CSSProperties, FC, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Loading } from "@illa-design/react"
import {
  actionTextStyle,
  actionWrapperStyle,
} from "@/page/History/components/ActionArea/style"
import { getSnapshotListCurrentPage } from "@/redux/currentAppHistory/currentAppHistorySelector"
import { currentAppHistoryActions } from "@/redux/currentAppHistory/currentAppHistorySlice"
import { fetchSnapShotList } from "@/services/history"

interface ActionAreaProps {
  style?: CSSProperties
  resetVirtualList: () => void
}
export const ActionArea: FC<ActionAreaProps> = (props) => {
  const { style, resetVirtualList } = props
  const { appId } = useParams()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const currentPage = useSelector(getSnapshotListCurrentPage)
  const [loading, setLoading] = useState(false)

  const fetchMore = useCallback(async () => {
    if (!appId) return
    setLoading(true)
    const page = currentPage + 1
    try {
      const { data } = await fetchSnapShotList({
        page,
        appID: appId,
      })
      dispatch(
        currentAppHistoryActions.updateCurrentAppHistoryReducer({
          ...data,
          currentPage: page,
          hasMore: data.totalPages !== page,
        }),
      )
      resetVirtualList()
    } catch (error) {
      // Handle error
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [appId, currentPage, resetVirtualList, dispatch])

  return (
    <div style={style}>
      {loading ? (
        <div css={actionWrapperStyle}>
          <Loading colorScheme="techPurple" />
        </div>
      ) : (
        <div css={actionTextStyle} onClick={fetchMore}>
          {t("editor.history.more")}
        </div>
      )}
    </div>
  )
}

ActionArea.displayName = "ActionArea"
