import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LoadingIcon } from "@illa-design/react"
import { AppCard } from "@/page/Dashboard/DashboardApps/AppCard"
import { cardContainerStyle } from "@/page/Dashboard/DashboardApps/AppContent/style"
import { TeamContentEmpty } from "@/page/Dashboard/components/TeamContentEmpty"
import { getDashboardApps } from "@/redux/dashboard/apps/dashboardAppSelector"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { fetchTeamAppList } from "@/services/apps"
import { TeamAppsProps } from "./interface"
import { fallbackLoadingStyle } from "./style"

export const TeamApps: FC<TeamAppsProps> = (props) => {
  const appList = useSelector(getDashboardApps)

  const dispatch = useDispatch()

  const [updateLoading, setUpdateLoading] = useState<boolean>(true)

  useEffect(() => {
    setUpdateLoading(true)
    fetchTeamAppList()
      .then((res) => {
        dispatch(dashboardAppActions.updateDashboardAppListReducer(res.data))
        return res.data
      })
      .finally(() => setUpdateLoading(false))
  }, [dispatch])

  return updateLoading ? (
    <div css={fallbackLoadingStyle}>
      <LoadingIcon spin={true} />
    </div>
  ) : appList.length !== 0 ? (
    <div css={cardContainerStyle}>
      {appList?.map((item) => (
        <AppCard key={item.appId} data-element="listItem" appInfo={item} />
      ))}
    </div>
  ) : (
    <TeamContentEmpty loading={props.loading} navigate={props.navigate} />
  )
}
