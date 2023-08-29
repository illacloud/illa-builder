import { FC } from "react"
import { useSelector } from "react-redux"
import { AppCard } from "@/page/Dashboard/DashboardApps/AppCard"
import { cardContainerStyle } from "@/page/Dashboard/DashboardApps/AppContent/style"
import { TeamContentEmpty } from "@/page/Dashboard/components/TeamContentEmpty"
import { getDashboardApps } from "@/redux/dashboard/apps/dashboardAppSelector"
import { TeamAppsProps } from "./interface"


export const TeamApps: FC<TeamAppsProps> = (props) => {
  const appList = useSelector(getDashboardApps)

  return appList.length !== 0 ? (
    <div css={cardContainerStyle}>
      {appList?.map((item) => (
        <AppCard key={item.appId} data-element="listItem" appInfo={item} />
      ))}
    </div>
  ) : (
    <TeamContentEmpty loading={props.loading} navigate={props.navigate} />
  )
}