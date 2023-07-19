import { FC, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Button } from "@illa-design/react"
import {
  badgeDotStyle,
  ellipse49Style,
  leftWrapperStyle,
  textStyle,
  timelineStyle,
} from "@/page/History/components/SnapShotItem/style"
import { getSnapshotListCurrentPage } from "@/redux/currentAppHistory/currentAppHistorySelector"
import { currentAppHistoryActions } from "@/redux/currentAppHistory/currentAppHistorySlice"
import { fetchSnapShotList } from "@/services/history"

export const ActionArea: FC = () => {
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
    } catch (error) {
      // Handle error
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [appId, currentPage, dispatch])

  return (
    <div css={timelineStyle}>
      <div css={leftWrapperStyle}>
        <div css={badgeDotStyle}>
          <div css={ellipse49Style} />
        </div>
      </div>
      <div css={textStyle}>
        <Button loading={loading} onClick={fetchMore}>
          {t("editor.history.more")}
        </Button>
      </div>
    </div>
  )
}

ActionArea.displayName = "ActionArea"
