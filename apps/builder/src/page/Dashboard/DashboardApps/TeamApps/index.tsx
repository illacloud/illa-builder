import { getCurrentTeamInfo, getPlanUtils } from "@illa-public/user-data"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  canManage,
} from "@illa-public/user-role-utils"
import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { Divider, LoadingIcon } from "@illa-design/react"
import { AppCard } from "@/page/Dashboard/DashboardApps/AppCard"
import { TeamContentEmpty } from "@/page/Dashboard/components/TeamContentEmpty"
import { getDashboardApps } from "@/redux/dashboard/apps/dashboardAppSelector"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { fetchTeamAppList } from "@/services/apps"
import { useFuse } from "@/utils/useFuse"
import { TeamAppsProps } from "./interface"
import { cardContainerStyle, fallbackLoadingStyle } from "./style"

export const TeamApps: FC<TeamAppsProps> = (props) => {
  const teamApps = useSelector(getDashboardApps)

  const dispatch = useDispatch()

  const [updateLoading, setUpdateLoading] = useState<boolean>(true)

  const fuse = useFuse(teamApps, {
    keys: ["appName", "config.description"],
  })

  const teamInfo = useSelector(getCurrentTeamInfo)!!

  const [searchParams] = useSearchParams()

  const keywords = searchParams.get("keywords")?.trim() ?? ""

  const appList =
    keywords === "" || keywords === ""
      ? teamApps
      : fuse.search(keywords).map((item) => item.item)

  const [showLine, setShowLine] = useState<boolean>(false)

  useEffect(() => {
    const controller = new AbortController()
    setUpdateLoading(true)
    fetchTeamAppList(controller.signal)
      .then((res) => {
        dispatch(dashboardAppActions.updateDashboardAppListReducer(res.data))
        setUpdateLoading(false)
        return res.data
      })
      .catch((err) => {
        if (err.message === "canceled") {
          return
        }
        setUpdateLoading(false)
      })
    return () => {
      controller.abort()
    }
  }, [dispatch])

  return updateLoading ? (
    <div css={fallbackLoadingStyle}>
      <LoadingIcon spin={true} />
    </div>
  ) : appList.length !== 0 ? (
    <>
      {showLine && <Divider direction="horizontal" />}
      <div
        css={cardContainerStyle}
        onScroll={(e) => {
          const target = e.target as HTMLDivElement
          if (target.scrollTop >= 24) {
            setShowLine(true)
          } else {
            setShowLine(false)
          }
        }}
      >
        {appList?.map((item) => (
          <AppCard key={item.appId} data-element="listItem" appInfo={item} />
        ))}
      </div>
    </>
  ) : (
    <TeamContentEmpty
      showCreate={canManage(
        teamInfo.myRole,
        ATTRIBUTE_GROUP.APP,
        getPlanUtils(teamInfo),
        ACTION_MANAGE.CREATE_APP,
      )}
      loading={props.loading}
      navigate={props.navigate}
    />
  )
}
